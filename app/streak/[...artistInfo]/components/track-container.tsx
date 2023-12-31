"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { TrackPlayer } from "./track-player";
import { useTimer } from "@/hooks/useTimer";

interface TrackContainerProps {
  tracks: Track[];
  artistId: string;
  artistName: string;
}

enum GameStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  COMPLETED = "COMPLETED",
}

export const TrackContainer = (props: TrackContainerProps) => {
  const session = useSession();
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NOT_STARTED
  );
  const playerRef = useRef<HTMLAudioElement>(null);
  const [score, setScore] = useState(0);

  const [tracks, setTracks] = useState<Track[]>(props.tracks.slice(0, 5));
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [guessString, setGuessString] = useState("");
  const { timer, setTimer } = useTimer({ gameStatus, setGameStatus });

  useEffect(() => {
    if (gameStatus === GameStatus.STARTED) {
      startRound();
    } else if (gameStatus === GameStatus.COMPLETED) {
      saveScore();
    }
  }, [score, gameStatus]);

  const startRound = () => {
    const randomTrack = pickRandomTrack();
    if (randomTrack) {
      setCurrentTrack(randomTrack);

      playerRef.current?.load();
      playerRef.current?.play();
    } else {
      setGameStatus(GameStatus.COMPLETED);
    }
  };

  const saveScore = () => {
    fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        userId: session?.data?.user.id,
        artistId: props.artistId,
        artistName: decodeURIComponent(props.artistName),
        score,
      }),
    });
  };

  // Get random song from Tracks array and remove it from array if chosen
  const pickRandomTrack = () => {
    let randomTrack = undefined;
    while (randomTrack === undefined) {
      if (tracks.length === 0) return;

      const randomIndex = Math.floor(Math.random() * tracks.length);
      randomTrack = tracks[randomIndex];
      if (randomTrack) {
        setTracks(tracks.filter((_, i) => i !== randomIndex));
      }
    }
    return randomTrack;
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setGuessString(value);
    if (value === currentTrack?.name.toLocaleLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setTimer(15);
      setGuessString("");
    }
  };

  const content = () => {
    switch (gameStatus) {
      case GameStatus.NOT_STARTED:
        return (
          <>
            <h2>{tracks.length} tracks found</h2>
            <button onClick={() => setGameStatus(GameStatus.STARTED)}>
              Start
            </button>
          </>
        );
      case GameStatus.STARTED:
        return (
          <>
            <h1>{timer}</h1>
            {currentTrack && (
              <TrackPlayer ref={playerRef} track={currentTrack!} />
            )}
            <h3>Current Score: {score}</h3>
            <input
              value={guessString}
              className="bg-slate-500 w-full"
              placeholder="Song title"
              onChange={onChangeInput}
            />
          </>
        );
      case GameStatus.COMPLETED:
        return (
          <>
            <h1>Your score is: {score}</h1>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col">
      {tracks.map((t, i) => (
        <p key={t.id}>
          {i} - {t.name}
        </p>
      ))}
      {content()}
    </div>
  );
};

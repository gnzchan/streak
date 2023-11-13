"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TrackPlayer } from "./track-player";

interface TrackContainerProps {
  tracks: Track[];
}

export const TrackContainer = ({ tracks }: TrackContainerProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [start, setStart] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  const [score, setScore] = useState(0);

  const [guessString, setGuessString] = useState("");

  useEffect(() => {
    const randomTrack = getRandomSongFromTracks();
    console.log(tracks.length);
    console.log(tracks);
    console.log(randomTrack.name);
    console.log(randomTrack);
    setCurrentTrack(randomTrack);

    if (start) {
      playerRef.current?.load();
      playerRef.current?.play();
    }
  }, [score, start]);

  // Get random song from Tracks array and remove it from array if chosen
  const getRandomSongFromTracks = () => {
    let randomTrack = undefined;
    while (randomTrack === undefined) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      randomTrack = tracks[randomIndex];
      if (randomTrack) tracks.splice(randomIndex, 1);
    }
    return randomTrack;
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setGuessString(value);
    if (value === currentTrack?.name.toLocaleLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setGuessString("");
    }
  };

  return (
    <div className="flex flex-col">
      <h3>Current Score</h3>
      <h1>{score}</h1>
      <button onClick={() => setStart(true)}>Start</button>
      {start && currentTrack && (
        <TrackPlayer track={currentTrack} ref={playerRef} />
      )}
      <input
        value={guessString}
        className="bg-slate-500 w-full"
        placeholder="Song title"
        onChange={onChangeInput}
      />
    </div>
  );
};

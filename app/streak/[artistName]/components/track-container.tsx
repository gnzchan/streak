"use client";

import { useEffect, useState } from "react";
import { TrackPlayer } from "./track-player";

interface TrackContainerProps {
  tracks: Track[];
}

export const TrackContainer = ({ tracks }: TrackContainerProps) => {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [start, setStart] = useState(false);

  useEffect(() => {
    // console.log(tracks);
    const randomTrack = getRandomSongFromTracks();
    setCurrentTrack(randomTrack);
  }, []);

  // Get random song from Tracks array and remove it from array if chosen
  const getRandomSongFromTracks = () => {
    let randomTrack = undefined;
    while (randomTrack === undefined) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      randomTrack = tracks[randomIndex];
      if (randomTrack) tracks.splice(randomIndex, 1);
    }
    console.log(randomTrack.name);
    return randomTrack;
  };

  return (
    <div className="flex flex-col">
      {/* {tracks.map((t) => (
        <div key={t.id}>{t.name}</div>
      ))} */}
      <button onClick={() => setStart(true)}>Start</button>
      {start && currentTrack && <TrackPlayer track={currentTrack} />}
    </div>
  );
};

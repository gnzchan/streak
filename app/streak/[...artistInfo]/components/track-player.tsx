import { useEffect } from "react";

interface TrackPlayerProps {
  track: Track;
}

export const TrackPlayer = ({ track }: TrackPlayerProps) => {
  useEffect(() => {}, []);

  return (
    <div className="bg-yellow-400">
      <h1>Song</h1>
      <audio controls autoPlay>
        <source src={track.preview_url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

import { forwardRef } from "react";

interface TrackPlayerProps {
  track: Track;
}

export const TrackPlayer = forwardRef<HTMLAudioElement, TrackPlayerProps>(
  ({ track }, ref) => {
    return (
      <div className="bg-yellow-400">
        <audio controls autoPlay ref={ref}>
          <source src={track.preview_url} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
);

TrackPlayer.displayName = "TrackPlayer";

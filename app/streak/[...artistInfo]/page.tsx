import { getTopTracksByArtist, getTracksByArtist } from "@/lib/spotify";
import { TrackContainer } from "./components/track-container";

interface StreakPageProps {
  params: {
    artistInfo: [string, string];
  };
}

const StreakPage = async ({ params }: StreakPageProps) => {
  const topTracksPromise = getTopTracksByArtist(params.artistInfo[0]);
  const additionalTracksPromise = getTracksByArtist(params.artistInfo[1]);
  const [
    { tracks: topTracks },
    {
      tracks: { items: additionalTracks },
    },
  ] = await Promise.all([topTracksPromise, additionalTracksPromise]);

  const popularTracks = additionalTracks.filter(
    (track) => track.popularity >= 70
  );

  const concatenatedTracks: Track[] = [...topTracks, ...popularTracks];
  const uniqueTracks: { [key: string]: Track } = {};
  concatenatedTracks.forEach((track) => {
    if (!uniqueTracks[track.id]) {
      uniqueTracks[track.id] = track;
    }
  });
  // Convert the uniqueItems object back to an array.
  const mergedTracks = Object.values(uniqueTracks);

  return (
    <div>
      <TrackContainer tracks={mergedTracks} />
    </div>
  );
};

export default StreakPage;

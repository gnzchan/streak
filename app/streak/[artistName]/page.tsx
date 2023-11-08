import { getTracksByArtist } from "@/lib/spotify";
import { TrackContainer } from "./components/track-container";

interface StreakPageProps {
  params: {
    artistName: string;
  };
}

const StreakPage = async ({ params }: StreakPageProps) => {
  const { tracks } = await getTracksByArtist(params.artistName);

  return (
    <div>
      <TrackContainer tracks={tracks.items} />
    </div>
  );
};

export default StreakPage;

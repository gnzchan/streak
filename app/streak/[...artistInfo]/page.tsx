import { getTracks } from "@/lib/spotify";
import { TrackContainer } from "./components/track-container";

interface StreakPageProps {
  params: {
    artistInfo: [string, string];
  };
}

const StreakPage = async ({ params }: StreakPageProps) => {
  const tracks = await getTracks(params.artistInfo[0], params.artistInfo[1]);

  return (
    <div>
      <TrackContainer tracks={tracks} />
    </div>
  );
};

export default StreakPage;

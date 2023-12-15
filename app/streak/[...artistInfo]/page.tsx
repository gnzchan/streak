import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getTracks } from "@/lib/spotify";
import { TrackContainer } from "./components/track-container";
import { authOptions } from "@/lib/auth-options";

interface StreakPageProps {
  params: {
    artistInfo: [string, string];
  };
}

const StreakPage = async ({ params }: StreakPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const tracks = await getTracks(params.artistInfo[0], params.artistInfo[1]);

  return (
    <div>
      <TrackContainer
        tracks={tracks}
        artistId={params.artistInfo[0]}
        artistName={params.artistInfo[1]}
      />
    </div>
  );
};

export default StreakPage;

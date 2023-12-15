import { getArtistLeaderboards, getTopArtist } from "@/lib/leaderboards";

const LeaderboardsPage = async () => {
  const artistDetails = await getArtistLeaderboards("6eUKZXaKkcviH0Ku9w2n3V");
  getTopArtist();

  return <div>Leaderboards</div>;
};

export default LeaderboardsPage;

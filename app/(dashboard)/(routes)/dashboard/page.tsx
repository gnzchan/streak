import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SearchArtistInput } from "@/app/(dashboard)/components/search-artist-input";
import { authOptions } from "@/lib/auth-options";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full bg-stone-500">
      <SearchArtistInput />
    </div>
  );
};

export default Dashboard;

import prismadb from "@/lib/prismadb";

export const getArtistLeaderboards = async (artistId: string) => {
  const artistDetails = await prismadb.userArtistScore.findMany({
    where: {
      artistId,
    },
    select: {
      score: true,
      artist: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return artistDetails;
};

export const getTopArtist = async () => {
  const topArtists = await prismadb.userArtistScore.groupBy({
    by: ["artistId"],
    _count: true,
    orderBy: {
      _count: {
        score: "desc",
      },
    },
    take: 10,
  });

  return topArtists;
};

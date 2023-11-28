import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, artistId, artistName, score } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const artistDetails = await prismadb.artist.findUnique({
      where: {
        artistId,
      },
      select: {
        name: true,
      },
    });

    if (!artistDetails) {
      await prismadb.artist.create({
        data: {
          artistId,
          name: artistName,
        },
      });
    }

    const userArtistScore = await prismadb.userArtistScore.findUnique({
      where: {
        userId_artistId: {
          userId,
          artistId,
        },
      },
      select: {
        score: true,
      },
    });

    if (userArtistScore) {
      await prismadb.userArtistScore.update({
        where: {
          userId_artistId: {
            userId,
            artistId,
          },
        },
        data: {
          score,
        },
      });
    } else {
      await prismadb.userArtistScore.create({
        data: {
          userId,
          artistId,
          score,
        },
      });
    }

    return NextResponse.json({
      score,
    });
  } catch (error) {
    console.log("[AUTH_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

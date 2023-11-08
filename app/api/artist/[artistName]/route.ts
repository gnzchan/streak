import { getTracksByArtist } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const artistName = searchParams.get("artistName");

  const tmdbKey = process.env.TMDB_KEY;

  if (!artistName) return;

  const { tracks } = await getTracksByArtist(artistName);

  const tracksToReturn = tracks.items.map((track) => track.popularity >= 70);

  return NextResponse.json(tracksToReturn);
};

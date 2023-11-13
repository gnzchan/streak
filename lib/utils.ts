import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPopularTracks = (tracks: Track[]): Track[] => {
  const avgPopularityIndex = Math.floor(
    tracks.reduce((acc, track) => acc + track.popularity, 0) / tracks.length
  );
  const yearNow = new Date().getFullYear();

  const popularTracks = tracks
    .sort((a, b) => b.popularity - a.popularity)
    .filter(
      (track) => yearNow - new Date(track.album.release_date).getFullYear() >= 1
    )
    .filter((track) => track.popularity >= avgPopularityIndex)
    .splice(0, 30);

  return popularTracks;
};

export const concatenateTracks = (
  artistId: string,
  topTracks: Track[],
  popularTracks: Track[]
) => {
  const tracks = [...topTracks, ...popularTracks];
  const uniqueTracks: { [key: string]: Track } = {};

  tracks.forEach((track) => {
    if (
      !uniqueTracks[track.id] &&
      track.artists[0].id === artistId &&
      !!track.preview_url
    ) {
      uniqueTracks[track.id] = track;
    }
  });

  // Convert the uniqueItems object back to an array.
  return Object.values(uniqueTracks);
};

export const cleanTrackTitles = (tracks: Track[]) => {
  const pattern = /\([^)]*\)|\([^’]*\)|\s*-\s*.*/g;
  const cleanedTitleTracks = tracks.map((track) => ({
    ...track,
    name: track.name.replace(pattern, "").trim(),
  }));

  return cleanedTitleTracks;
};

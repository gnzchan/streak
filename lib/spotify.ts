"use server";

import { getServerSession } from "next-auth/next";
import { cleanTrackTitles, concatenateTracks, getPopularTracks } from "./utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getAccessToken = async () => {
  const accessToken = await getServerSession(authOptions);
  return accessToken.access_token ?? "";
};

export const searchArtist = async (
  formattedSearchString: string
): Promise<SearchArtists> => {
  const access_token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${formattedSearchString}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getTopTracksByArtist = async (
  artistId: string
): Promise<TopTracks> => {
  const access_token = await getAccessToken();

  // TODO: Market should be based on where app is ran.
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=us`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

export const getTracksByArtist = async (
  artistName: string,
  page: number
): Promise<SearchTracks> => {
  const access_token = await getAccessToken();
  const offset = page * 50;

  const url = `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=50&offset=${offset}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    return { total: 0, tracks: { items: [] } };
  }

  return response.json();
};

export const getTracks = async (
  artistId: string,
  artistName: string
): Promise<Track[]> => {
  const topTracksPromise = getTopTracksByArtist(artistId);
  const formattedArtistName = artistName.replaceAll("%20", "+");

  const additionalTracksPromise1 = getTracksByArtist(formattedArtistName, 0);
  const additionalTracksPromise2 = getTracksByArtist(formattedArtistName, 1);

  const [
    { tracks: topTracks },
    {
      tracks: { items: additionalTracks1 },
    },
    {
      tracks: { items: additionalTracks2 },
    },
  ] = await Promise.all([
    topTracksPromise,
    additionalTracksPromise1,
    additionalTracksPromise2,
  ]);

  const popularTracks = [
    ...getPopularTracks(additionalTracks1),
    ...getPopularTracks(additionalTracks2),
  ];

  const concatenatedTracks: Track[] = concatenateTracks(
    artistId,
    topTracks,
    popularTracks
  );

  const cleanedTrackTitles: Track[] = cleanTrackTitles(concatenatedTracks);

  return cleanedTrackTitles;
};

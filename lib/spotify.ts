import { concatenateTracks, getPopularTracks } from "./utils";

export const getAccessToken = async () => {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? "";
  const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? "";

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    next: { revalidate: 3300 },
  });

  return res.json();
};

export const searchArtist = async (
  formattedSearchString: string
): Promise<SearchArtists> => {
  const { access_token } = await getAccessToken();

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
  const { access_token } = await getAccessToken();

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
  const { access_token } = await getAccessToken();
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
    topTracks,
    popularTracks
  );

  return concatenatedTracks;
};

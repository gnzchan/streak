export const getAccessToken = async () => {
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN ?? "";

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
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
): Promise<SearchTracks> => {
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
  artistName: string
): Promise<SearchTracks> => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=40`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return response.json();
};

type Artist = {
  external_urls: {
    spotify: string;
    // "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V";
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  // ["pop", "singer-songwriter pop", "uk pop"];
  href: string;
  // "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V";
  id: string;
  // "6eUKZXaKkcviH0Ku9w2n3V";
  images: {
    height: number;
    // 640;
    url: string;
    // "https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba";
    width: number;
    // 640;
  }[];
  name: string;
  // "Ed Sheeran";
  popularity: number;
  // 86;
  type: string;
  // "artist";
  uri: string;
  // "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V";
};

type SearchArtists = {
  artists: {
    items: Artist[];
  };
};

type Track = {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
      // "https://open.spotify.com/album/3T4tUhGYeRNVUGevb0wThu";
    };
    href: string;
    // "https://api.spotify.com/v1/albums/3T4tUhGYeRNVUGevb0wThu";
    id: string;
    // "3T4tUhGYeRNVUGevb0wThu";
    images: {
      height: number;
      // 640;
      width: number;
      // 640;
      url: string;
      // "https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba";
    }[];
    name: string;
    // "÷ (Deluxe)";
    release_date: string;
    // "2017-03-03";
    release_date_precision: string;
    //  "day";
    type: string;
    // "album";
    uri: string;
    // "spotify:album:3T4tUhGYeRNVUGevb0wThu";
    artists: {
      external_urls: {
        spotify: string;
        // "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V";
      };
      href: string;
      // "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V";
      id: string;
      // "6eUKZXaKkcviH0Ku9w2n3V";
      name: string;
      // "Ed Sheeran";
      type: string;
      // "artist";
      uri: string;
      // "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V";
    }[];
    is_playable: boolean;
  };
  artists: {
    external_urls: {
      spotify: string;
      // "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V";
    };
    href: string;
    // "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V";
    id: string;
    // "6eUKZXaKkcviH0Ku9w2n3V";
    name: string;
    // "Ed Sheeran";
    type: string;
    // "artist";
    uri: string;
    // "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V";
  }[];
  disc_number: number;
  // 1;
  duration_ms: number;
  //  263400;
  explicit: boolean;
  // false;
  external_ids: {
    isrc: string;
    // "GBAHS1700024";
  };
  external_urls: {
    spotify: string;
    // "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v";
  };
  href: string;
  // "https://api.spotify.com/v1/tracks/0tgVpDi06FyKpA1z0VMD4v";
  id: string;
  //  "0tgVpDi06FyKpA1z0VMD4v";
  is_playable: string;
  //  true;
  name: string;
  // "Perfect";
  popularity: string;
  // 90;
  preview_url: string;
  // "https://p.scdn.co/mp3-preview/4e30857a3c7da3f8891483643e310bb233afadd2?cid=7e8e3e3b29bc461f9edf910e780581ae";
  track_number: number;
  // 5;
  type: string;
  // "track";
  uri: string;
  // "spotify:track:0tgVpDi06FyKpA1z0VMD4v";
  is_local: boolean;
  // false;
};

type SearchTracks = {
  tracks: {
    items: Track[];
  };
};

enum AlbumGroup {
  album = "album",
  single = "single",
  compilation = "compilation",
  appearsOn = "appears_on",
}

enum AlbumType {
  album = "album",
  single = "single",
  compilation = "compilation",
}

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ExternalUrl {
  spotify: string;
}

interface Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface AlbumRestriction {
  reason: string;
}

export interface Album {
  album_group: AlbumGroup;
  album_type: AlbumType;
  artists: Artist[];
  available_markets: string;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: AlbumRestriction;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Paging {
  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: string;
}

interface NewReleasesPaging extends Paging {
  items: Album[];
}

export interface NewReleases {
  albums: NewReleasesPaging;
}

const authorization = Buffer.from(
  `${process.env.spotify_client_id}:${process.env.spotify_client_secret}`
).toString("base64");

const getToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    headers: {
      Authorization: `Basic ${authorization}`,
    },
  });
  const result = (await res.json()) as Token;
  return result.access_token;
};

const getHeaders = async () => {
  const token = await getToken();
  return { Authorization: `Bearer ${token}` };
};

export const getNewReleases = async () => {
  const headers = await getHeaders();
  const res = await fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers,
  });

  const result = (await res.json()) as NewReleases;
  if (!result) {
    return {
      notFound: true,
    };
  }

  return result;
};

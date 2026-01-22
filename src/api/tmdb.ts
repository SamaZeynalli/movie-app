const BASE_URL = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string;

if (!apiKey) {
  console.warn("VITE_TMDB_API_KEY is missing in .env");
}

export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  vote_average?: number;
};

async function fetchFromTMDB(endpoint: string, signal?: AbortSignal) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");

  const res = await fetch(url.toString(), { signal });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  return res.json();
}

export async function getMovieById(id: string) {
  const data = await fetchFromTMDB(`/movie/${id}`);
  return data;
}

export async function getMovieGenres() {
  const data = await fetchFromTMDB("/genre/movie/list");
  return data;
}

export async function getTvGenres() {
  const data = await fetchFromTMDB("/genre/tv/list");
  return data;
}

export async function searchMovies(query: string, signal?: AbortSignal) {
  const q = query.trim();
  if (!q) return { results: [] as TmdbMovie[] };

  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", q);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const res = await fetch(url.toString(), { signal });

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }

  const data = await res.json();

  return {
    results: (data?.results ?? []) as TmdbMovie[],
  };
}

export function tmdbPosterUrl(
  path: string | null,
  size: "w92" | "w185" | "w342" | "w500" | "w780" = "w342",
) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function discoverMoviesByGenre(
  genreId: string,
  sort: string = "popularity.desc",
  page: number = 1,
) {
  return fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}&sort_by=${sort}&page=${page}`,
  );
}

export async function discoverTvByGenre(
  genreId: string,
  sort: string = "popularity.desc",
  page: number = 1,
) {
  return fetchFromTMDB(
    `/discover/tv?with_genres=${genreId}&sort_by=${sort}&page=${page}`,
  );
}

export async function createGuestSession() {
  const data = await fetchFromTMDB("/authentication/guest_session/new");

  return data as {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
  };
}

export async function addToFavorite(
  mediaType: "movie" | "tv",
  mediaId: number,
  favorite: boolean,
  guestSessionId: string,
) {
  const url = new URL(`${BASE_URL}/account/0/favorite`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("guest_session_id", guestSessionId);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media_type: mediaType,
      media_id: mediaId,
      favorite,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update favorite");
  }

  return res.json() as Promise<{
    status_code: number;
    status_message: string;
  }>;
}

export type MovieCreditPerson = {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path: string | null;
};

export async function getMovieCredits(movieId: number | string) {
  const data = await fetchFromTMDB(`/movie/${movieId}/credits`);

  return data as {
    id: number;
    cast: MovieCreditPerson[];
    crew: MovieCreditPerson[];
  };
}

export async function getPopularMovies(page: number = 1) {
  const data = await fetchFromTMDB(`/movie/popular?page=${page}`);
  return {
    page: data.page,
    results: data.results as TmdbMovie[],
    totalPages: data.total_pages,
  };
}
export async function getTopRatedMovies(page: number = 1) {
  const data = await fetchFromTMDB(`/movie/top_rated?page=${page}`);
  return {
    page: data.page,
    results: data.results,
    totalPages: data.total_pages,
  };
}

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day",
  page: number = 1,
) {
  const data = await fetchFromTMDB(
    `/trending/movie/${timeWindow}?page=${page}`,
  );

  return {
    page: data.page,
    results: data.results,
    totalPages: data.total_pages,
  };
}

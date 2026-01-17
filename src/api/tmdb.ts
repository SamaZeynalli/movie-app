const BASE_URL = "https://api.themoviedb.org/3"

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string

if (!apiKey) {
  console.warn("VITE_TMDB_API_KEY is missing in .env")
}

export type TmdbMovie = {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
  vote_average?: number
}

export async function searchMovies(
  query: string,
  signal?: AbortSignal
) {
  const q = query.trim()
  if (!q) return { results: [] as TmdbMovie[] }

  const url = new URL(`${BASE_URL}/search/movie`)
  url.searchParams.set("api_key", apiKey)
  url.searchParams.set("query", q)
  url.searchParams.set("include_adult", "false")
  url.searchParams.set("language", "en-US")
  url.searchParams.set("page", "1")

  const res = await fetch(url.toString(), { signal })

  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`)
  }

  const data = await res.json()

  return {
    results: (data?.results ?? []) as TmdbMovie[],
  }
}

export function tmdbPosterUrl(
  path: string | null,
  size: "w92" | "w185" | "w342" | "w500" = "w342"
) {
  if (!path) return ""
  return `https://image.tmdb.org/t/p/${size}${path}`
}


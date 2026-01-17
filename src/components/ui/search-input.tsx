import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { useEffect, useState } from "react";
import { searchMovies, tmdbPosterUrl } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb"


const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    searchMovies(query, controller.signal)
      .then((res) => {
        setResults(res.results.slice(0, 6)); // max 6 result
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query]);

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="pl-10"
      />
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg z-50">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-muted cursor-pointer"
            >
              {movie.poster_path ? (
                <img
                  src={tmdbPosterUrl(movie.poster_path, "w92")}
                  alt={movie.title}
                  className="h-12 w-8 rounded object-cover"
                />
              ) : (
                <div className="h-12 w-8 rounded bg-muted" />
              )}

              <span className="text-sm font-medium">{movie.title}</span>
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="absolute top-full mt-2 text-xs text-muted-foreground">
          Searching...
        </div>
      )}
    </div>
  );
};

export default SearchInput;

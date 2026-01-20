import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies, tmdbPosterUrl } from "../api/tmdb";
import type { TmdbMovie } from "../api/tmdb";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";

const Trending = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getTrendingMovies(timeWindow, page)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }, [timeWindow, page]);

  return (
    <main className="relative pt-24 px-6 max-w-6xl mx-auto space-y-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Trending Movies
        </h1>
        <p className="text-lg text-muted-foreground">
          What people are watching right now
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => {
              setPage(1);
              setTimeWindow("day");
            }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              timeWindow === "day"
                ? "bg-indigo-600 text-white"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => {
              setPage(1);
              setTimeWindow("week");
            }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              timeWindow === "week"
                ? "bg-indigo-600 text-white"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground">
          Loading trending movies...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="group cursor-pointer space-y-2 transition hover:-translate-y-1"
            >
              {movie.poster_path ? (
                <img
                  src={tmdbPosterUrl(movie.poster_path)}
                  className="aspect-[2/3] w-full rounded-xl object-cover shadow-md transition group-hover:scale-[1.03]"
                />
              ) : (
                <div className="aspect-[2/3] rounded-xl bg-muted" />
              )}

              <p className="text-sm font-semibold line-clamp-2 group-hover:text-indigo-600 transition">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default Trending;

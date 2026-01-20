import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularMovies, tmdbPosterUrl } from "../api/tmdb";
import type { TmdbMovie } from "../api/tmdb";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";

const Popular = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPopularMovies(page)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <main className="relative pt-24 px-6 max-w-7xl mx-auto space-y-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          🔥 Popular Movies
        </h1>
        <p className="text-lg text-muted-foreground">
          Movies ordered by popularity
        </p>
      </div>
      {loading ? (
        <div className="text-center text-muted-foreground">
          Loading popular movies...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="
                  cursor-pointer
                  space-y-3
                  group
                  transition
                  hover:-translate-y-1
                "
              >
                {movie.poster_path ? (
                  <img
                    src={tmdbPosterUrl(movie.poster_path, "w342")}
                    alt={movie.title}
                    className="
                      aspect-[2/3]
                      w-full
                      rounded-2xl
                      object-cover
                      shadow
                      transition
                      group-hover:scale-[1.03]
                    "
                  />
                ) : (
                  <div className="aspect-[2/3] rounded-2xl bg-muted" />
                )}

                <p className="text-sm font-semibold line-clamp-2 group-hover:text-indigo-600">
                  {movie.title}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                  <span>{movie.release_date}</span>
                </div>
              </div>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={page === 1 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    page === totalPages ? "pointer-events-none opacity-40" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      <div className="text-center text-sm text-muted-foreground">
        POPULAR · PAGINATION · SORT (coming soon)
      </div>
    </main>
  );
};

export default Popular;

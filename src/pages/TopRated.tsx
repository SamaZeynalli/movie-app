import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopRatedMovies, tmdbPosterUrl } from "../api/tmdb";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

const TopRated = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getTopRatedMovies(page)
      .then((res) => {
        setMovies(res.results);
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Loading top rated movies...
      </div>
    );
  }

  return (
    <main className="relative pt-24 px-6 max-w-6xl mx-auto space-y-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-orange-500/20 blur-3xl" />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          ⭐ Top Rated Movies
        </h1>
        <p className="text-lg text-muted-foreground">
          The highest rated movies of all time
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group cursor-pointer space-y-3 transition hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-xl shadow-md">
              {movie.poster_path ? (
                <img
                  src={tmdbPosterUrl(movie.poster_path)}
                  className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="aspect-[2/3] bg-muted" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold line-clamp-2 group-hover:text-yellow-600 transition">
                {movie.title}
              </p>
              {movie.vote_average && (
                <p className="text-xs text-muted-foreground">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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
              onClick={() =>
                setPage((p) => (p < totalPages ? p + 1 : p))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default TopRated;
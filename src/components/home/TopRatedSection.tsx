import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopRatedMovies } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb";
import MovieSection from "../../components/MovieSection";

const TopRatedSection = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRatedMovies()
      .then((res) => setMovies(res.results.slice(0, 10)))
      .finally(() => setLoading(false));
  }, []);

  if (loading || movies.length === 0) return null;

  return (
    <section className="relative px-6 py-24 sm:py-32">
  
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-3xl" />
      </div>


      <div className="mx-auto max-w-4xl text-center space-y-4">
        <Link to="/top-rated">
          <span
            className="
              group inline-flex items-center gap-2
              rounded-full px-6 py-2.5
              text-xs font-extrabold uppercase tracking-widest
              text-yellow-800
              bg-yellow-100/80
              ring-1 ring-yellow-200
              transition
              hover:bg-yellow-500
              hover:text-white
              hover:ring-yellow-400
            "
          >
            Top Rated
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
              →
            </span>
          </span>
        </Link>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The highest-rated movies of all time
        </h2>

        <p className="text-lg text-muted-foreground">
          Critically acclaimed films loved by audiences worldwide
        </p>
      </div>

      {/* Movies */}
      <div className="mt-16">
        <MovieSection title="" movies={movies} />
      </div>
    </section>
  );
};

export default TopRatedSection;
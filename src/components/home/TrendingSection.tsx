import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies, tmdbPosterUrl } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb";

const TrendingSection = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies("day", 1)
      .then((res) => setMovies(res.results.slice(0, 5)))
      .finally(() => setLoading(false));
  }, []);

  if (loading || movies.length === 0) return null;

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate("/trending")}
            className="
    group relative inline-flex items-center gap-2
    rounded-full px-6 py-2.5
    text-sm font-extrabold uppercase tracking-wider
    text-white
    bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400
    shadow-[0_0_30px_rgba(236,72,153,0.6)]
    transition-all
    hover:shadow-[0_0_45px_rgba(236,72,153,0.9)]
    hover:scale-105
  "
          >
            <span className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 opacity-70" />
            <span className="relative flex items-center gap-2">
              Trending now
              <span className="opacity-80 group-hover:translate-x-1 transition">
                →
              </span>
            </span>
          </button>

          <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
            Movies everyone is watching
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div
            onClick={() => navigate(`/movie/${movies[0].id}`)}
            className="relative lg:row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm outline outline-black/5 hover:shadow-lg transition"
          >
            <img
              src={tmdbPosterUrl(movies[0].poster_path, "w500")}
              alt={movies[0].title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            <div className="relative flex h-full flex-col justify-end p-8">
              <h3 className="text-2xl font-bold text-white">
                {movies[0].title}
              </h3>
              <p className="mt-2 text-sm text-white/80 line-clamp-3">
                {movies[0].overview}
              </p>
            </div>
          </div>

          {movies.slice(1).map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="relative cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm outline outline-black/5 hover:shadow-lg transition"
            >
              <img
                src={tmdbPosterUrl(movie.poster_path, "w342")}
                alt={movie.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

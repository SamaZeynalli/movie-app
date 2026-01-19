import { useEffect, useState } from "react";
import { getPopularMovies, tmdbPosterUrl } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb";
import { Card, CardContent } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PopularSection = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPopularMovies().then((res) => {
      setMovies(res.results.slice(0, 6));
    });
  }, []);

  if (movies.length === 0) return null;

  const [first, second, ...rest] = movies;

  return (
    <section className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 rounded-full" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <Link to="/popular" className="inline-block">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition">
            Popular Movies
          </h2>
        </Link>
        <p className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Most watched right now
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
        {[first, second].map(
          (movie) =>
            movie && (
              <Card
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="
    overflow-hidden
    border-none
    bg-background/60
    backdrop-blur
    shadow-lg
    cursor-pointer
    transition
    hover:scale-[1.01]
  "
              >
                <CardContent className="p-0">
                  <img
                    src={tmdbPosterUrl(movie.poster_path, "w500")}
                    alt={movie.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ),
        )}
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rest.map((movie) => (
          <Card
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="
    border-none
    bg-transparent
    shadow-none
    cursor-pointer
    transition
    hover:-translate-y-1
  "
          >
            <CardContent className="p-0 space-y-2">
              <img
                src={tmdbPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="aspect-[2/3] w-full rounded-md object-cover"
              />
              <p className="text-sm font-medium line-clamp-2">{movie.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularSection;

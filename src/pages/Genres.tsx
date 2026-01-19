import { useEffect, useState } from "react";
import { getMovieGenres, getTvGenres } from "../api/tmdb";
import { useNavigate } from "react-router-dom";

type Genre = {
  id: number;
  name: string;
};

const Genres = () => {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieGenres().then((res) => setMovieGenres(res.genres));
    getTvGenres().then((res) => setTvGenres(res.genres));
  }, []);

  return (
    <main className="relative pt-24 px-6 max-w-6xl mx-auto space-y-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Explore Genres
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover movies and TV shows by your mood
        </p>
      </div>

      <section className="rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100/40 p-10 shadow-sm">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-indigo-700">
          🎬 Movies
        </h2>

        <div className="flex flex-wrap gap-3">
          {movieGenres.map((genre) => (
            <span
              key={genre.id}
              onClick={() =>
                navigate(
                  `/discover/movie?genre=${genre.id}&name=${encodeURIComponent(
                    genre.name,
                  )}`,
                )
              }
              className="
                cursor-pointer
                rounded-full
                bg-white
                px-5
                py-2
                text-sm
                font-semibold
                text-indigo-700
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:bg-indigo-600
                hover:text-white
              "
            >
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-purple-50 to-pink-100/40 p-10 shadow-sm">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-purple-700">
          📺 TV Shows
        </h2>

        <div className="flex flex-wrap gap-3">
          {tvGenres.map((genre) => (
            <span
              key={genre.id}
              onClick={() =>
                navigate(
                  `/discover/tv?genre=${genre.id}&name=${encodeURIComponent(
                    genre.name,
                  )}`,
                )
              }
              className="
                cursor-pointer
                rounded-full
                bg-white
                px-5
                py-2
                text-sm
                font-semibold
                text-purple-700
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:bg-purple-600
                hover:text-white
              "
            >
              {genre.name}
            </span>
          ))}
        </div>
      </section>

      <div className="text-center text-sm text-muted-foreground">
        DISCOVER · FILTER · SORT · MOVIES vs TV (coming soon)
      </div>
    </main>
  );
};

export default Genres;

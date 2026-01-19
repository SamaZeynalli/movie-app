import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieById,
  getMovieCredits,
  tmdbPosterUrl,
  addToFavorite,
} from "../api/tmdb";
import { getGuestSessionId } from "../lib/guestSession";
import { toast } from "sonner";
import CastSection from "../components/movie/CastSection";
import type { MovieCreditPerson } from "../api/tmdb";

type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [cast, setCast] = useState<MovieCreditPerson[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getMovieById(id).then(setMovie);
    getMovieCredits(id).then((res) => setCast(res.cast));
  }, [id]);

  if (!movie) {
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Loading movie...
      </div>
    );
  }

  return (
    <main className="pt-24">
      <div className="px-6 mb-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      <section className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 -z-10">
            <img
              src={tmdbPosterUrl(movie.backdrop_path, "w780")}
              alt=""
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            {movie.poster_path && (
              <img
                src={tmdbPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="rounded-2xl shadow-xl"
              />
            )}
          </div>

          <div className="md:col-span-2 flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-800">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="rounded-full bg-muted px-3 py-1">
                  {movie.release_date}
                </span>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {movie.overview}
            </p>

            <div className="space-y-4">
              <CastSection cast={cast} />
            </div>

            <button
              disabled={favLoading}
              onClick={async () => {
                try {
                  setFavLoading(true);
                  const sessionId = await getGuestSessionId();

                  await addToFavorite(
                    "movie",
                    movie.id,
                    !isFavorite,
                    sessionId,
                  );

                  setIsFavorite((prev) => !prev);
                } catch {
                  toast.error("Login required", {
                    description:
                      "Please log in to your TMDB account to add movies to favorites.",
                  });
                } finally {
                  setFavLoading(false);
                }
              }}
              className={`w-fit rounded-full px-6 py-3 text-sm font-semibold transition
                ${
                  isFavorite
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-indigo-600 text-white hover:bg-indigo-500 shadow"
                }
              `}
            >
              {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorite"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetail;

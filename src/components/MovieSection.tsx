import type { TmdbMovie } from "../api/tmdb";
import { tmdbPosterUrl } from "../api/tmdb";
import { Card, CardContent } from "./ui/card";

type MovieSectionProps = {
  title: string;
  movies: TmdbMovie[];
};

const MovieSection = ({ title, movies }: MovieSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            className="
    group
    border-none
    bg-transparent
    shadow-none
    cursor-pointer
    transition-transform
    hover:-translate-y-1
  "
          >
            <CardContent className="p-0 space-y-2">
              <div className="overflow-hidden rounded-md">
                <img
                  src={tmdbPosterUrl(movie.poster_path)}
                  alt={movie.title}
                  className="
        w-full
        aspect-[2/3]
        object-cover
        transition-transform
        duration-300
        group-hover:scale-105
      "
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MovieSection;

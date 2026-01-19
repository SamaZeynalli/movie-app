import { tmdbPosterUrl } from "../../api/tmdb";
import type { MovieCreditPerson } from "../../api/tmdb";

type Props = {
  cast: MovieCreditPerson[];
};

const CastSection = ({ cast }: Props) => {
  if (!cast.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Cast</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {cast.slice(0, 10).map((person) => (
          <div
            key={person.id}
            className="w-[120px] shrink-0 space-y-2"
          >
            {person.profile_path ? (
              <img
                src={tmdbPosterUrl(person.profile_path, "w185")}
                className="h-[180px] w-full rounded-lg object-cover"
              />
            ) : (
              <div className="h-[180px] w-full rounded-lg bg-muted" />
            )}

            <div className="text-sm">
              <p className="font-semibold leading-tight line-clamp-2">
                {person.name}
              </p>
              {person.character && (
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {person.character}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastSection;
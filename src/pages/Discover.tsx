import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  discoverMoviesByGenre,
  discoverTvByGenre,
  tmdbPosterUrl,
} from "../api/tmdb";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";

type Item = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
};

const Discover = () => {
  const { type } = useParams(); // movie | tv
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const genreId = searchParams.get("genre");
  const genreName = searchParams.get("name");

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sort, setSort] = useState("popularity.desc");

  useEffect(() => {
    if (!type || !genreId) return;

    setLoading(true);

    const fetcher =
      type === "movie" ? discoverMoviesByGenre : discoverTvByGenre;

    fetcher(genreId, sort, page)
      .then((res) => {
        setItems(res.results);
        setTotalPages(res.total_pages);
      })
      .finally(() => setLoading(false));
  }, [type, genreId, sort, page]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-muted-foreground">
        Loading discover results...
      </div>
    );
  }

  return (
    <main className="relative pt-28 px-6 max-w-7xl mx-auto space-y-14">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[320px] w-[320px] rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="text-indigo-600">{genreName}</span>{" "}
          <span>
            {type === "movie" ? "Movies" : "TV Shows"}
          </span>
        </h1>

        <p className="text-lg text-muted-foreground">
          Browse {type === "movie" ? "movies" : "TV shows"} by genre
        </p>

        <button
          onClick={() => navigate("/genres")}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back to genres
        </button>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setSort("popularity.desc");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-full text-sm ${
            sort === "popularity.desc"
              ? "bg-indigo-600 text-white"
              : "bg-muted"
          }`}
        >
          Popular
        </button>

        <button
          onClick={() => {
            setSort("vote_average.desc");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-full text-sm ${
            sort === "vote_average.desc"
              ? "bg-indigo-600 text-white"
              : "bg-muted"
          }`}
        >
          Top Rated
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate(
                type === "movie"
                  ? `/movie/${item.id}`
                  : `/tv/${item.id}`
              )
            }
            className="group cursor-pointer space-y-3 transition hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-xl shadow-md">
              {item.poster_path ? (
                <img
                  src={tmdbPosterUrl(item.poster_path)}
                  className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="aspect-[2/3] bg-muted" />
              )}
            </div>

            <p className="text-sm font-semibold line-clamp-2 group-hover:text-indigo-600 transition">
              {item.title || item.name}
            </p>
          </div>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-40" : ""}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                page < totalPages && setPage(page + 1)
              }
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default Discover;
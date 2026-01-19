import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb";
import MovieSection from "../../components/MovieSection";

const TopRatedSection = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRatedMovies()
      .then((res) => setMovies(res.results))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return <MovieSection title="🏆 Top Rated" movies={movies} />;
};

export default TopRatedSection;
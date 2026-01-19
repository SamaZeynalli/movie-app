import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/tmdb";
import type { TmdbMovie } from "../../api/tmdb";
import MovieSection from "../../components/MovieSection";

const TrendingSection = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies()
      .then((res) => setMovies(res.results))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return <MovieSection title="🔥 Trending" movies={movies} />;
};

export default TrendingSection;
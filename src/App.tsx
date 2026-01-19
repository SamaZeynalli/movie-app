import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGuestSessionId } from "./lib/guestSession";
import Header from "./components/Header";

import Home from "./pages/Home";
import Genres from "./pages/Genres";
import MovieDetail from "./pages/MovieDetail";
import Discover from "./pages/Discover";
import { Toaster } from "./components/ui/sonner";

const PopularPage = () => (
  <div className="pt-24 px-6 text-muted-foreground">
    Popular movies page (coming soon)
  </div>
);

const TopRatedPage = () => (
  <div className="pt-24 px-6 text-muted-foreground">
    Top rated movies page (coming soon)
  </div>
);

const TrendingPage = () => (
  <div className="pt-24 px-6 text-muted-foreground">
    Trending page (coming soon)
  </div>
);

function App() {
  useEffect(() => {
    getGuestSessionId();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/genres" element={<Genres />} />

        <Route path="/popular" element={<PopularPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/discover/:type" element={<Discover />} />

        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;

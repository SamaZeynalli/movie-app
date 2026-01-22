import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGuestSessionId } from "./lib/guestSession";
import Header from "./components/Header";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import Trending from "./pages/Trending";

import Home from "./pages/Home";
import Genres from "./pages/Genres";
import MovieDetail from "./pages/MovieDetail";
import Discover from "./pages/Discover";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/Footer";


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
        <Route path="/discover/:type" element={<Discover />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
      <Footer/>
      <Toaster richColors />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const Home = () => <div className="p-6">Home</div>
const Popular = () => <div className="p-6">Popular Movies</div>
const TopRated = () => <div className="p-6">Top Rated Movies</div>
const Trending = () => <div className="p-6">Trending Movies</div>

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </>
  );
}

export default App;
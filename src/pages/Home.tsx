import TrendingSection from "../components/home/TrendingSection";
import PopularSection from "../components/home/PopularSection";
import TopRatedSection from "../components/home/TopRatedSection";

const Home = () => {
  return (
    <main className="pt-20 space-y-12">
      <TrendingSection />
      <PopularSection />
      <TopRatedSection />
    </main>
  );
};

export default Home;
import Hero from "../components/Home/Hero";
import HighlightQuote from "../components/Home/HighlightQuote";
import LookbookWall from "../components/Home/LookbookWall";
import NewArrivals from "../components/Home/NewArrivals";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <Hero banner={"/homebanner-1.jpeg"} />
      <HighlightQuote />
      <LookbookWall />
      <Hero banner={"/homebanner-2.jpeg"} />
      <NewArrivals />
    </div>
  );
};

export default Home;

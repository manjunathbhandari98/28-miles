import Features from "../components/Home/Features";
import FindUsOn from "../components/Home/FindUsOn";
import Hero from "../components/Home/Hero";
import HighlightQuote from "../components/Home/HighlightQuote";
import LookbookWall from "../components/Home/LookbookWall";
import NewArrivals from "../components/Home/NewArrivals";
import Newsletter from "../components/Home/NewsLetter";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 md:pt-16">
      <Hero banner={"/homebanner-1.jpeg"} view="desktop" />
      <Hero banner={"/banners/mv-banner-1.jpg"} view="mobile" />
      <HighlightQuote />
      <LookbookWall />
      <FindUsOn />
      <Hero banner={"/banners/banner-dt-1.jpg"} view="desktop" />
      <Hero banner={"/banners/banner-dt-1.jpg"} view="mobile" />
      {/* <Hero banner={"/banners/mv-banner-3.jpg"} view="mobile" /> */}
      <NewArrivals />
      <Features />
      <Newsletter />
    </div>
  );
};

export default Home;

const Hero = ({ banner, view }) => {
  return (
    <div
      className={`w-full ${
        view === "desktop" ? "md:flex hidden" : "md:hidden"
      }`}
    >
      <img
        src={banner}
        alt="hero-banner"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Hero;

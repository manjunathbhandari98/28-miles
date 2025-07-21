const Hero = ({ banner }) => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="hero-banner"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Hero;

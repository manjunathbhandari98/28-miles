import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wider">
          About <span className="text-white/70">28-Miles</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
          28-Miles is not just a clothing brand — it's a streetwear culture. We
          blend bold designs with comfort, inspired by the movement of the
          streets, stories of the youth, and the rhythm of everyday rebels. Our
          mission is to make fashion that speaks without saying a word.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="bg-white/5 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">🧢 Our Style</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            From oversized fits to minimal cuts, we keep our styles raw, bold,
            and authentic — just like the streets we draw inspiration from.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">🧵 Our Craft</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            Every piece is designed with precision, using premium fabrics,
            ethical processes, and an eye for lasting detail.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-white/10">
          <h2 className="text-2xl font-semibold mb-3">🌍 Our Vision</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            We aim to build a community of like-minded trendsetters, creators,
            and visionaries who want to wear their story with pride.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Join the Movement</h3>
        <p className="text-gray-400 mb-6 text-lg">
          Whether you're from 28 miles away or the other side of the world —
          this is your fashion, your expression, your brand.
        </p>
        <Link to={"/"}>
          <button className="bg-white cursor-pointer text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all">
            Explore Collection
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;

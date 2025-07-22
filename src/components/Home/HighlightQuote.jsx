import { Club, Disc, Pause, Play } from "lucide-react";

const HighlightQuote = () => {
  return (
    <div className="relative w-full py-16 bg-black text-white overflow-hidden">
      {/* Left Icons */}
      <div className="absolute top-8 left-4 flex flex-col gap-4 animate-pulse">
        <Disc size={18} className="text-pink-500 rotate-12" />
        <Play size={18} className="text-yellow-400 -rotate-12" />
        <Pause size={18} className="text-lime-400 rotate-45" />
        <Club size={18} className="text-cyan-300 -rotate-6 mt-4" />
      </div>

      {/* Decorative Vertical Line */}
      <div className="absolute left-10 top-0 h-full w-[1px] bg-white opacity-10 rotate-[2deg]" />

      {/* Center Quote */}
      <div className="text-center bitcount z-10 relative font-black uppercase tracking-wider">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-tr from-red-500 via-white to-red-500 drop-shadow-md skew-y-2">
          28 Miles
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-5xl mt-[-10px] text-transparent bg-clip-text bg-gradient-to-tr from-lime-400 via-cyan-400 to-blue-500 drop-shadow-sm -skew-y-3">
          Off Normal
        </h2>
      </div>

      {/* Right Icons */}
      <div className="absolute bottom-6 right-4 flex items-center gap-4 animate-bounce text-sm">
        <span className="font-semibold text-white tracking-wide">Wings Up</span>
        <Disc size={18} className="text-blue-300 rotate-6" />
        <Play size={18} className="text-pink-300 -rotate-6" />
        <Pause size={18} className="text-yellow-300 rotate-3" />
      </div>
    </div>
  );
};

export default HighlightQuote;

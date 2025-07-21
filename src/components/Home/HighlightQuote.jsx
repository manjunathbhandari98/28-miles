import { Club, Disc, Pause, Play } from "lucide-react";

const HighlightQuote = () => {
  return (
    <div className="relative w-full py-12 bg-black text-white overflow-hidden">
      {/* Left Icon Column */}
      <div className="absolute top-10 left-6 flex flex-col gap-6 animate-pulse">
        <Disc size={20} className="text-pink-500 rotate-12" />
        <Play size={20} className="text-yellow-400 -rotate-12" />
        <Pause size={20} className="text-lime-400 rotate-45" />
        <Club size={20} className="text-cyan-300 -rotate-6 mt-6" />
      </div>

      {/* Random Street Line */}
      <div className="absolute left-16 top-0 h-full w-[2px] bg-white opacity-20 rotate-[2deg]" />

      {/* Quote */}
      <div className="text-center bitcount z-10 relative font-black uppercase tracking-wider">
        <h1 className="text-[50px] md:text-[80px] text-transparent bg-clip-text bg-gradient-to-tr from-red-500 via-white to-red-500 drop-shadow-md skew-y-2">
          28 Miles
        </h1>
        <h1 className="text-[30px] md:text-[60px] mt-[-20px] text-transparent bg-clip-text bg-gradient-to-tr from-lime-400 via-cyan-400 to-blue-500 drop-shadow-sm -skew-y-3">
          off normal
        </h1>
      </div>

      {/* Right Icon Row */}
      <div className="absolute bottom-10 right-6 flex gap-6 animate-bounce">
        <div className="vast-shadow">Wings Up</div>
        <Disc size={20} className="text-blue-300 rotate-6" />
        <Play size={20} className="text-pink-300 -rotate-6" />
        <Pause size={20} className="text-yellow-300 rotate-3" />
      </div>
    </div>
  );
};

export default HighlightQuote;

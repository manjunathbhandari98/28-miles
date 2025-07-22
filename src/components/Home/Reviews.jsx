import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Aarav M.",
    text: "Fits like a dream and makes me feel confident.",
  },
  { id: 2, name: "Sneha R.", text: "Streetwear vibes 😊 fast shipping." },
  {
    id: 3,
    name: "Jay D.",
    text: "28Miles nailed premium style at this price.",
  },
  { id: 4, name: "Zara K.", text: "Compliments nonstop. Fabric is unreal." },
  { id: 5, name: "Neil G.", text: "Street‑style heaven. Ordering again soon." },
];

const CARD_WIDTH = 300;
const GAP = 20;

const Reviews = () => {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);

  const scrollTo = (i) => {
    ref.current.scrollTo({ left: i * (CARD_WIDTH + GAP), behavior: "smooth" });
    setIdx(i);
  };

  const next = () => idx < reviews.length - 3 && scrollTo(idx + 1);
  const prev = () => idx > 0 && scrollTo(idx - 1);

  return (
    <div className="pt-16 px-6 text-white">
      <h2 className="text-4xl font-extrabold tracking-wide text-center uppercase">
        What Customers Say
      </h2>
      <div className="mt-8 relative">
        <div ref={ref} className="flex overflow-hidden gap-5 justify-center">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="min-w-[300px] bg-zinc-900 p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition"
            >
              <div className="mb-4 italic leading-snug text-sm">“{r.text}”</div>
              <div className="text-right font-semibold text-pink-400">
                — {r.name}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-3 rounded-full ${
            idx === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-500"
          }`}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <button
          onClick={next}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 p-3 rounded-full ${
            idx >= reviews.length - 3
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-pink-500"
          }`}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Reviews;

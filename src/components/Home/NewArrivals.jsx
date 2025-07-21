import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const products = [
  {
    id: 1,
    name: "Neon Graffiti Tee",
    price: "₹1,299",
    image: "/gallery-1.jpg",
  },
  {
    id: 2,
    name: "Urban Camouflage Hoodie",
    price: "₹1,899",
    image: "/gallery-2.jpg",
  },
  {
    id: 3,
    name: "Midnight Denim Jacket",
    price: "₹2,499",
    image: "/gallery-3.jpg",
  },
  {
    id: 4,
    name: "Rogue Cargo Pants",
    price: "₹1,599",
    image: "/gallery-4.jpg",
  },
  {
    id: 5,
    name: "Psychedelic Oversized Shirt",
    price: "₹1,699",
    image: "/gallery-5.jpg",
  },
  {
    id: 5,
    name: "Psychedelic Oversized Shirt",
    price: "₹1,699",
    image: "/gallery-2.jpg",
  },
  {
    id: 5,
    name: "Psychedelic Oversized Shirt",
    price: "₹1,699",
    image: "/gallery-6.jpg",
  },
  {
    id: 5,
    name: "Psychedelic Oversized Shirt",
    price: "₹1,699",
    image: "/gallery-7.jpg",
  },
  {
    id: 5,
    name: "Psychedelic Oversized Shirt",
    price: "₹1,699",
    image: "/gallery-8.jpg",
  },
];

const NewArrivals = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-10">
      <h2 className="text-3xl font-bold text-white px-6 mb-4 uppercase tracking-wide">
        New Arrivals
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white"
        >
          <ChevronRight />
        </button>

        {/* Scrollable List */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 scrollbar-hide scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] cursor-pointer bg-zinc-900 rounded-xl p-3 shadow-lg hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-white font-semibold text-lg">
                {product.name}
              </h3>
              <p className="text-pink-300 text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;

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
    <section className="relative py-12">
      <h2 className="text-3xl text-center font-bold text-white mb-8 uppercase tracking-wide px-4">
        New Arrivals
      </h2>

      <div className="relative">
        {/* Scroll Buttons for md+ screens */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white z-10"
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>

        {/* Scrollable Product List */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-4 md:px-6 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[70%] sm:min-w-[45%] md:min-w-[250px] bg-zinc-900 rounded-xl p-3 shadow-lg snap-start transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h3 className="text-white font-semibold text-lg">
                {product.name}
              </h3>
              <p className="text-pink-300 text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;

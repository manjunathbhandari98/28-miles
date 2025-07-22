// src/components/collection/LookbookWall.jsx
import Masonry from "react-masonry-css";

const items = [
  { image: "/gallery-1.jpg", title: "Outfit", link: "" },
  { image: "/gallery-2.jpg", title: "Oversized", link: "" },
  { image: "/gallery-8.jpg", title: "Shirts", link: "" },
  { image: "/gallery-4.jpg", title: "Plus Sized", link: "" },
  { image: "/gallery-5.jpg", title: "Extra Sized", link: "" },
  { image: "/gallery-7.jpg", title: "Hoodie", link: "" },
  { image: "/gallery-6.jpg", title: "Hooded Tees", link: "" },
  { image: "/gallery-3.jpg", title: "Smoke Tee", link: "" },
];

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 2,
};

const LookbookWall = () => {
  return (
    <div className="px-4 md:px-8 py-10 bg-black text-white">
      {/* <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-wide text-center">
        The Lookbook
      </h2> */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 cursor-pointer"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="mb-4 bitcount rounded hover:scale-105 transition duration-300 ease-in-out flex flex-col overflow-hidden"
          >
            <img
              src={item.image}
              alt={`Look ${index + 1}`}
              className="w-full rounded-t-lg"
            />
            <div className="bg-[#9bb367] rounded-b-lg flex flex-col gap-3 p-5 justify-center items-center">
              <h1 className="text-xl uppercase text-black font-bold">
                {item.title}
              </h1>
              <button className="bg-black p-3 cursor-pointer font-bold text-center uppercase rounded">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default LookbookWall;

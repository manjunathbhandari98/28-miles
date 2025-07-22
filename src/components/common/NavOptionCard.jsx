const NavOptionCard = ({ items = [], images }) => {
  return (
    <div className="pt-8 bg-transparent">
      <div className="bg-zinc-900 shadow-xl w-[900px] h-80 flex overflow-hidden border border-zinc-800">
        {/* Left side - Items list */}
        <div className="flex flex-col gap-4 p-6 text-sm uppercase text-zinc-200 tracking-wide w-1/2">
          {/* <h3 className="text-amber-400 font-semibold text-base mb-2">Explore</h3> */}
          {items.map((item, index) => (
            <div
              key={index}
              className="hover:text-amber-300 transition-colors duration-200 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right side - Promo Images */}
        <div className="flex gap-3 p-4 w-1/2 justify-center items-center ">
          <img
            src={images[0]}
            alt="promo"
            className="w-[230px] h-[260px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img
            src={images[1]}
            alt="promo"
            className="w-[130px] h-[160px] object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default NavOptionCard;

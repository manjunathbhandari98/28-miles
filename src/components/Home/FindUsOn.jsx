import Marquee from "react-fast-marquee";

const FindUsOn = () => {
  const brands = [
    { name: "amazon", img: "/brands/amazon.png" },
    { name: "myntra", img: "/brands/myntra.png" },
    { name: "flipkart", img: "/brands/flipkart.png" },
    { name: "ajio", img: "/brands/ajio.png" },
    { name: "snapdeal", img: "/brands/snapdeal.png" },
    { name: "28-miles", img: "/28Miles.jpeg" },
  ];

  return (
    <div className=" py-2 overflow-hidden">
      <div className="w-full text-center py-10">
        <h2 className="text-3xl font-bold text-white px-6 mb-4 uppercase tracking-wide">
          Find us On
        </h2>
      </div>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={false}
        className=" text-white text-2xl tracking-wider font-semibold uppercase"
      >
        {brands.map((brand, index) => (
          <img key={index} src={brand.img} alt="" className="w-30 mx-10" />
        ))}
      </Marquee>
    </div>
  );
};

export default FindUsOn;

import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Check,
  ChevronRight,
  Dot,
  Handshake,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import SizeChart from "../components/common/SizeChart";
import { product } from "../data/product";
import { products } from "../data/products";

const ProductView = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("features");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [pinCode, setPinCode] = useState(null);
  const [showDeleveryDate, setShowDeleveryDate] = useState(false);
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const mockImages = [
    "/gallery-1.jpg",
    "/gallery-5.jpg",
    "/gallery-8.jpg",
    "/gallery-2.jpg",
    "/gallery-3.jpg",
    "/gallery-7.jpg",
    "/gallery-4.jpg",
    "/gallery-6.jpg",
  ];

  const MAX_VISIBLE = 3;
  const remainingCount = mockImages.length - MAX_VISIBLE;

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const [colors, setSelectedColors] = useState([]);

  const handleScroll = () => {
    const scrollX = scrollRef.current?.scrollLeft || 0;
    const width = scrollRef.current?.offsetWidth || 1;
    const index = Math.round(scrollX / width);
    setActiveIndex(index);
  };

  const handleSelectColor = (color) => {
    setSelectedColors((prevColors) => {
      if (prevColors.includes(color)) {
        return prevColors.filter((c) => c !== color);
      } else {
        return [...prevColors, color];
      }
    });
  };

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSelectSize = (size) => {
    setSelectedSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const features = [
    { feature: "Free Shipping", icon: <Truck size={16} color="yellow" /> },
    {
      feature: "Cash on Delevery",
      icon: <Banknote size={16} color="yellow" />,
    },
    {
      feature: "7 days easy returns",
      icon: <Handshake size={16} color="yellow" />,
    },
  ];

  const productSpecifications = [
    { id: 1, title: "Design", feature: "Graphic Print" },
    { id: 2, title: "Fit", feature: "Regular" },
    { id: 3, title: "Occassion", feature: "Casual Wear" },
    { id: 4, title: "Fabric", feature: "Cotton" },
    { id: 5, title: "Neck", feature: "Round Neck" },
    { id: 6, title: "Sleeve", feature: "Half Sleeve" },
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.price) * 100
  );

  const [isInputSelected, setIsInputSelected] = useState(false);

  // Mock Delevery Date
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 10);

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (colors.length > 0 && selectedSizes.length > 0) {
      setIsInputSelected(true);
    } else {
      setIsInputSelected(false);
    }
  }, [colors, selectedSizes]);

  const handleShowDeleveryDate = () => {
    if (pinCode.length == 6) {
      setShowDeleveryDate(true);
    } else {
      setShowDeleveryDate(false);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${product.name} add to Bag successfully!`, {
      duration: 4000,
      position: "bottom-center",
    });
  };

  return (
    <>
      <div className="md:pt-16 pt-10 m-5 montserrat">
        {/* breadcrumb */}

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto scrollbar-hide">
          {/* Product images */}

          <div className="main-image flex flex-col md:flex-row gap-3 p-3 md:p-10">
            {/* image list */}
            {/* Mobile: Horizontal scrollable one-by-one image slider */}
            {/* Mobile: Horizontal slider with dots */}

            <div className="sm:hidden w-full flex flex-col gap-3">
              <div
                className="flex gap-4 h-[400px] overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                ref={scrollRef}
                onScroll={handleScroll}
              >
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="min-w-full snap-start flex-shrink-0 border border-gray-300/50 rounded-xl"
                  >
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="rounded-xl p-1 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === activeIndex ? "bg-yellow-400" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Vertical image list */}
            <div className="hidden sm:flex flex-col gap-4 w-[90px] h-[700px] overflow-y-auto scrollbar-hide">
              {product.images.map((image, index) => (
                <div
                  onClick={() => setSelectedImage(index)}
                  key={index}
                  className="border border-gray-300/50 rounded-xl"
                >
                  <img src={image} alt="" className="rounded-xl p-1" />
                </div>
              ))}
            </div>

            {/* main image */}
            <div className="rounded-xl sm:h-[700px] sm:flex hidden w-full">
              <img
                src={product.images[selectedImage]}
                alt=""
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
          </div>

          {/* product Info */}
          <div className="md:p-10 flex flex-col gap-6 ">
            {/* <h1 className="text-md hidden sm:flex text-white/60">
            Home/Men/Denim-Jacket
          </h1> */}
            <h1 className="text-xl font-bold uppercase">{product.name}</h1>
            <h3 className="text-md text-gray-300">{product.description}</h3>
            <div className="flex justify-between items-center">
              {/* price */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-white font-semibold text-xl">
                  ₹{product.price}
                </span>
                <span className="line-through text-md text-zinc-500">
                  ₹{product.oldPrice}
                </span>
                <span className="text-md font-semibold text-green-500 uppercase">
                  {discount}% off
                </span>
                <br className="flex md:hidden" />
                <span className="text-xs text-gray-400">
                  inclusive of all taxes
                </span>
              </div>
              {/* Ratings */}
              <div className=" text-black shadow-2xl hidden text-center left-2 bg-white py-1 px-3 rounded-full md:flex gap-1 items-center">
                <Star fill="yellow" size={16} color="yellow-800" />
                <h2 className="text-md font-semibold">{product.rating}</h2>
              </div>
            </div>
            <div className="border-[1px] my-3 border-white/20 shadow-xl"></div>
            {/* Colours */}
            <div className="flex flex-col gap-3">
              <h2 className="text-md font-semibold">Colours</h2>
              <div className="flex gap-4">
                {product.colors.map((colour) => (
                  <div
                    onClick={() => handleSelectColor(colour)}
                    key={colour.id}
                    className={`flex items-center justify-center border-2 cursor-pointer rounded-full h-10 w-10
    ${
      colors?.includes(colour)
        ? "ring-2 ring-offset-2 ring-white"
        : "ring-1 ring-zinc-700"
    }
  `}
                    style={{ backgroundColor: colour }}
                  >
                    {colors?.includes(colour) && (
                      <Check size={18} className="font-bold text-gray-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Sizes */}
            <div className="flex flex-col gap-3">
              <div
                onClick={() => setShowSizeChart(true)}
                className="flex justify-between items-center my-2"
              >
                <h2 className="text-md font-semibold">Sizes</h2>
                <h2 className="text-sm font-semibold flex gap-0.5 cursor-pointer items-center text-yellow-500">
                  Size Chart
                  <ChevronRight size={18} />
                </h2>
              </div>
              <div className="flex gap-4">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectSize(size)}
                    className={`h-10 w-10 cursor-pointer flex items-center justify-center rounded border
      ${
        selectedSizes.includes(size)
          ? "bg-yellow-300 text-black font-bold"
          : "border-white/50"
      }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            {!isInputSelected && (
              <p className="text-xs text-red-500 px-2">
                Please Select colour and size
              </p>
            )}

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 w-full">
              {/* Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!isInputSelected}
                className={`${
                  isInputSelected
                    ? "bg-yellow-300 text-black cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                } p-3 flex gap-2  items-center justify-center uppercase font-bold text-md rounded text-center`}
              >
                <ShoppingBag size={18} />
                Add to bag
              </button>
              <button className="border flex gap-2 p-3 items-center justify-center cursor-pointer uppercase font-bold text-md rounded text-center">
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            {/* Delevery Options */}
            <div className="flex flex-col gap-3">
              <h2 className="text-md font-semibold my-4">
                Check Delevery Date
              </h2>

              <div className="flex flex-col gap-4 items-center">
                <div className="border m-2 rounded border-gray-300/40 w-full flex justify-between items-center">
                  <input
                    onChange={(e) => setPinCode(e.target.value)}
                    type="text"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="outline-0 border-0 p-3 placeholder:text-white/40 placeholder:font-medium appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter your city pincode"
                  />
                  <button
                    onClick={handleShowDeleveryDate}
                    className="bg-white cursor-pointer uppercase p-3 text-black font-bold text-md"
                  >
                    check
                  </button>
                </div>
                {/* Availability */}
                {showDeleveryDate && (
                  <div className={`flex gap-3 px-3 w-full`}>
                    Excepted Delevery :
                    <span className="text-green-500 font-semibold">
                      {formattedDate}
                    </span>
                  </div>
                )}

                {/* Services */}
                <div className="flex w-full flex-wrap gap-3 justify-between">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Dot />
                      {feature.icon}
                      <h5 className="text-sm">{feature.feature}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-3">
              <h2 className="text-md font-semibold my-4">Product Details</h2>

              {/* Product Features */}
              <div className="flex flex-col border-b border-white/10 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("features")}
                >
                  <h3 className="text-md">Product Features</h3>
                  {activeSection === "features" ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
                <AnimatePresence>
                  {activeSection === "features" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-zinc-300 mt-2"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-2 sm:p-4">
                        {productSpecifications.map((specification) => (
                          <div
                            key={specification.id}
                            className="flex flex-col gap-2"
                          >
                            <h3 className="text-md font-semibold uppercase">
                              {specification.title}
                            </h3>
                            <p className="text-sm text-gray-300/50">
                              {specification.feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Product Description */}
              <div className="flex flex-col border-b border-white/10 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("description")}
                >
                  <h3 className="text-md">Product Description</h3>
                  {activeSection === "description" ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
                <AnimatePresence>
                  {activeSection === "description" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-zinc-300 mt-2"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, velit tempora? Adipisci corporis id delectus
                      praesentium nulla corrupti illo dicta, repudiandae ipsam
                      ipsa omnis. Culpa nobis molestiae molestias quas porro
                      maiores beatae quod voluptatibus inventore ipsum? Sequi
                      voluptate ut repellat!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Return and Exchange */}
              <div className="flex flex-col  pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("returnspolicy")}
                >
                  <h3 className="text-md">Return & Refund Policy</h3>
                  {activeSection === "returnspolicy" ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </div>
                <AnimatePresence>
                  {activeSection === "returnspolicy" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-zinc-300 mt-2"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, velit tempora? Adipisci corporis id delectus
                      praesentium nulla corrupti illo dicta, repudiandae ipsam
                      ipsa omnis. Culpa nobis molestiae molestias quas porro
                      maiores beatae quod voluptatibus inventore ipsum? Sequi
                      voluptate ut repellat!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Rating and Reviews */}
              <div className="flex flex-col  pb-4">
                <div className="flex flex-col gap-3">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("reviews")}
                  >
                    <h3 className="text-md">Rating and Reviews</h3>
                    {activeSection === "reviews" ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                  <div className="flex items-center font-semibold text-black/80 py-1 px-2 w-16 text-sm justify-center gap-0.5 rounded bg-amber-400">
                    4.5
                    <Star fill="black" size={14} color="black" />
                  </div>
                  <div className="flex gap-2">
                    {mockImages.slice(0, MAX_VISIBLE).map((img, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 overflow-hidden rounded-md"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index}`}
                          className="object-cover w-full h-full"
                        />
                        {index === MAX_VISIBLE - 1 && remainingCount > 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
                            +{remainingCount}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {activeSection === "reviews" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm text-zinc-300 mt-2"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorem, velit tempora? Adipisci corporis id delectus
                      praesentium nulla corrupti illo dicta, repudiandae ipsam
                      ipsa omnis. Culpa nobis molestiae molestias quas porro
                      maiores beatae quod voluptatibus inventore ipsum? Sequi
                      voluptate ut repellat!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold m-3">Similar Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 sm:gap-5 gap-1">
            {products.map((product) => (
              <ProductCard item={product} />
            ))}
          </div>
        </div>
      </div>
      {showSizeChart && <SizeChart onClose={() => setShowSizeChart(false)} />}
    </>
  );
};

export default ProductView;

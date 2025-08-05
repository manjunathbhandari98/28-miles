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
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import SizeChart from "../components/common/SizeChart";
import ErrorPage from "../components/ui/ErrorPage";
import LoadingPage from "../components/ui/LoadingPage";
import { useWishList } from "../hooks/useWishList";
import {
  fetchProductBySlug,
  getSimilarProducts,
} from "../service/productService";
import { useCart } from "./../hooks/useCart";

const ProductView = () => {
  const [activeSection, setActiveSection] = useState("features");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [pinCode, setPinCode] = useState(null);
  const [showDeleveryDate, setShowDeleveryDate] = useState(false);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInputSelected, setIsInputSelected] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { slug } = useParams();

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { handleAddToCart } = useCart();

  // const { user, isAuthenticated } = useAuth();

  const { handleAddToWishList, isInWishList } = useWishList();

  useEffect(() => {
    const fetchProdut = async () => {
      try {
        setLoading(true);
        const res = await fetchProductBySlug(slug);
        setProduct(res);
        setReviews(res.reviews.map((reviews) => reviews));

        setError(null);
      } catch (error) {
        console.error(error);
        setError("Product Doesn't Exist");
      } finally {
        setLoading(false);
      }
    };

    fetchProdut();
  }, [slug]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!product) return;
      try {
        setLoading(true);
        const res = await getSimilarProducts(product.categoryId);
        setSimilarProducts(res.content);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Category Doesn't Exist");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [product]);
  const filteredSimilar = similarProducts?.filter(
    (sp) => sp.productId !== product.productId
  );
  const MAX_VISIBLE = 3;
  const reviewImages = reviews
    .flatMap((r) => r.images ?? []) // collects all images, skips nulls
    .slice(0, MAX_VISIBLE);

  const moreCount = reviews.flatMap((r) => r.images ?? []).length - MAX_VISIBLE;

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

  // Mock Delevery Date
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 10);

  const formattedDate = futureDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (selectedColors.length > 0 && selectedSizes.length > 0) {
      setIsInputSelected(true);
    } else {
      setIsInputSelected(false);
    }
  }, [selectedColors, selectedSizes]);

  const handleShowDeleveryDate = () => {
    if (pinCode.length == 6) {
      setShowDeleveryDate(true);
    } else {
      setShowDeleveryDate(false);
    }
  };

  const onAddToCart = async () => {
    try {
      // Validate selections
      if (selectedSizes.length === 0 || selectedColors.length === 0) {
        toast.error("Please select size and color");
        return;
      }

      await handleAddToCart(product, selectedSizes, selectedColors);

      const itemCount = selectedSizes.length * selectedColors.length;
      toast.success(
        `${product.name} added to bag! (${itemCount} item${
          itemCount > 1 ? "s" : ""
        })`,
        { duration: 4000, position: "top-center" }
      );

      // Optional: Clear selections after adding to cart
      // setSelectedSizes([]);
      // setSelectedColors([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart");
    }
  };

  const onAddToWishList = async () => {
    try {
      const alreadyInWishlist = isInWishList(product.productId);
      await handleAddToWishList(product.productId);

      toast.success(
        alreadyInWishlist
          ? `${product.name} is already in wishlist`
          : `${product.name} added successfully`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to wishlist");
    }
  };

  const discount = Math.round(
    ((product?.oldPrice - product?.price) / product?.oldPrice) * 100
  );

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-500 text-sm">
          <LoadingPage />
        </div>
      ) : error ? (
        <ErrorPage message={error} />
      ) : !product ? (
        <div className="text-center text-gray-500 text-sm">
          No products found.
        </div>
      ) : (
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
                  {product?.images.map((image, index) => (
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
                  {product?.images.map((_, index) => (
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
                {product?.images.map((image, index) => (
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
                  src={product?.images[selectedImage]}
                  alt=""
                  className="rounded-xl w-full h-full object-cover"
                />
              </div>
            </div>

            {/* product Info */}
            <div className="md:p-10 p-3 flex flex-col gap-6 ">
              {/* <h1 className="text-md hidden sm:flex text-white/60">
            Home/Men/Denim-Jacket
          </h1> */}
              <h1 className="text-xl font-bold uppercase">{product?.name}</h1>
              <h3 className="text-md text-gray-300">{product?.summary}</h3>
              <div className="flex justify-between items-center">
                {/* price */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-white font-semibold text-xl">
                    ₹{product?.price}
                  </span>
                  <span className="line-through text-md text-zinc-500">
                    ₹{product?.oldPrice}
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
                {product?.rating > 0 && (
                  <div className=" text-black shadow-2xl hidden text-center left-2 bg-white py-1 px-3 rounded-full md:flex gap-1 items-center">
                    <Star fill="yellow" size={16} color="yellow-800" />
                    <h2 className="text-md font-semibold">{product?.rating}</h2>
                  </div>
                )}
              </div>
              <div className="border-[1px] my-3 border-white/20 shadow-xl"></div>
              {/* Colours */}
              <div className="flex flex-col gap-3">
                <h2 className="text-md font-semibold">Colours</h2>
                <div className="flex gap-4">
                  {product?.colors.map((colour) => (
                    <div
                      onClick={() => handleSelectColor(colour)}
                      key={colour.id}
                      title={colour}
                      className={`flex items-center justify-center border-2 cursor-pointer rounded-full h-10 w-10
                                  ${
                                    selectedColors?.includes(colour)
                                      ? "ring-2 ring-offset-2 ring-white"
                                      : "ring-1 ring-zinc-700"
                                  }
                                `}
                      style={{ backgroundColor: colour }}
                    >
                      {selectedColors?.includes(colour) && (
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
                  {product?.sizes.map((size, index) => (
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
                  onClick={onAddToCart}
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
                <button
                  onClick={onAddToWishList}
                  className="border flex gap-2 p-3 items-center justify-center cursor-pointer uppercase font-bold text-md rounded text-center"
                >
                  <Heart
                    size={18}
                    className={
                      isInWishList(product.productId)
                        ? "text-red-500 fill-red-500"
                        : "text-white"
                    }
                  />
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
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden text-sm text-zinc-300 mt-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-2 sm:p-4">
                          {Object.entries(product?.productFeatures).map(
                            ([key, value]) => (
                              <div key={key} className="flex flex-col gap-2">
                                {value != null && (
                                  <>
                                    <h3 className="text-md font-semibold uppercase">
                                      {key}
                                    </h3>
                                    <p className="text-sm text-gray-300/50">
                                      {value}
                                    </p>
                                  </>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Description */}
                {product.description && (
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
                          {product.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Return and Exchange */}
                <div className="flex flex-col pb-4">
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
                        We want you to be fully satisfied with your purchase. If
                        you are not completely happy with your order, you may
                        return most items within 7 days of delivery for a full
                        refund or exchange. To be eligible for a return, items
                        must be unused, in original packaging, and in the same
                        condition as when you received them. Some exclusions may
                        apply (e.g., personalized or final sale items). To
                        initiate a return, please contact our customer support
                        team with your order details. Refunds will be processed
                        to the original payment method within 7-10 business days
                        after we receive and inspect the returned item. Shipping
                        charges are non-refundable. If the return is a result of
                        our error or defective product, we will gladly cover the
                        return shipping cost.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Rating and Reviews */}
                {product?.rating > 0 && (
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
                        {product?.rating}
                        <Star fill="black" size={14} color="black" />
                      </div>
                      <div className="flex gap-2">
                        {reviewImages.map((img, index) => (
                          <div
                            key={index}
                            className="relative w-20 h-20 overflow-hidden rounded-md"
                          >
                            <img
                              src={img}
                              alt={`Review image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            {/* If this is the last visible image and there are more, show the overlay */}
                            {index === reviewImages.length - 1 &&
                              moreCount > 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
                                  +{moreCount}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeSection === "reviews" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 p-4 shadow-sm"
                        >
                          <div className="flex flex-col gap-5">
                            {product.reviews.slice(0, 2).map((review) => {
                              const formattedDate = new Date(
                                review.createdAt
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              });

                              return (
                                <div
                                  key={review.reviewId}
                                  className="flex flex-col gap-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-gray-200">
                                      {review.username}
                                    </div>
                                    <div className="text-xs text-gray-200">
                                      {formattedDate}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={16}
                                        className={
                                          i < review.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }
                                      />
                                    ))}
                                  </div>

                                  <p className="text-sm text-gray-100 leading-relaxed mt-1">
                                    {review.comment}
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          <button
                            onClick={() =>
                              navigate("/product-reviews", {
                                state: { product },
                              })
                            }
                            className="w-full mt-10 p-3 cursor-pointer rounded border border-gray-100 text-center"
                          >
                            View All Reviews
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {filteredSimilar?.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold m-3">Similar Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 sm:gap-5 gap-1">
                {filteredSimilar?.map((product) => (
                  <ProductCard key={product.id} item={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showSizeChart && <SizeChart onClose={() => setShowSizeChart(false)} />}
    </>
  );
};

export default ProductView;

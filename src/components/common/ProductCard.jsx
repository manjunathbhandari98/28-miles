/* eslint-disable no-unused-vars */
import { Heart, Star, X } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { useWishList } from "../../hooks/useWishList";
import LoadingPage from "../ui/LoadingPage";

const ProductCard = ({ item }) => {
  const location = useLocation();
  const isWishListPage = location.pathname.includes("wishlist");

  const {
    isInWishList,
    handleAddToWishList,
    handleRemoveFromWishList,
    refreshWishList,
  } = useWishList();

  const wishlisted = isInWishList(item.productId);

  const handleWishListToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (wishlisted) {
        await handleRemoveFromWishList(item.productId);
        toast.success("Removed from wishlist");
      } else {
        await handleAddToWishList(item.productId);
        toast.success("Added to wishlist");
      }
      await refreshWishList(); // Ensure reactivity
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await handleRemoveFromWishList(item.productId);
      toast.success("Item removed from Wishlist");
      await refreshWishList(); // Ensure UI updates
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("Item moved to bag!");
  };

  if (!item) return <LoadingPage />;

  return (
    <div className="w-full sm:w-auto z-1">
      <Link to={`/product-view/${item.slug}`}>
        <div
          className={`group cursor-pointer bg-zinc-900 ${
            !isWishListPage && "sm:rounded-xl"
          } overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto`}
        >
          {/* Product Image */}
          <div
            className={`relative ${
              isWishListPage ? "h-40 sm:52 md:h-70" : "h-52 sm:h-64 md:h-80"
            } w-full overflow-hidden`}
          >
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Wishlist Toggle */}
            {!isWishListPage && (
              <div
                onClick={handleWishListToggle}
                className="absolute top-3 right-3 bg-white p-1.5 rounded-full"
              >
                <Heart
                  size={18}
                  className={
                    wishlisted ? "text-red-500 fill-red-500" : "text-black"
                  }
                />
              </div>
            )}

            {/* Remove Icon for Wishlist Page */}
            {isWishListPage && (
              <div
                onClick={handleRemove}
                className="absolute top-3 right-3 hover:rotate-90 bg-white text-black p-1.5 rounded-full transition"
              >
                <X size={18} />
              </div>
            )}

            {/* Rating */}
            {item.rating && (
              <div className="absolute bottom-2 left-2 bg-white text-black py-1 px-2 rounded-full flex gap-1 items-center text-xs font-semibold">
                <Star fill="yellow" size={14} color="yellow" />
                {item.rating}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-4 text-left space-y-1">
            <h2 className="sm:text-sm text-xs font-semibold uppercase text-white truncate">
              {item.name}
            </h2>
            <p className="text-xs text-zinc-400 truncate">{item.summary}</p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-white font-semibold sm:text-lg text-md">
                ₹{item.price}
              </span>
              {item.oldPrice && (
                <span className="line-through text-sm text-zinc-500">
                  ₹{item.oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* Wishlist Page: Add to Bag Button */}
          {isWishListPage && (
            <div className="border-t mb-5 border-gray-300/40 m-2 rounded bg-yellow-400 text-center py-2 px-4 montserrat">
              <button
                onClick={handleAddToBag}
                className="text-black cursor-pointer uppercase font-semibold"
              >
                Add To Bag
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

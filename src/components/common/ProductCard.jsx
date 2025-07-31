import { Heart, Star, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [wishlist, setWishList] = useState(false);
  const location = useLocation();

  const isWishListPage = location.pathname.includes("wishlist");

  const handleWishList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishList((prev) => !prev);
  };

  const handleAddToBag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("Moved...");
  };

  const handleRemoveWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert("Removed");
  };

  return (
    <div className="w-full sm:w-auto z-1">
      <Link to={`/product-view/${item.slug}`}>
        <div
          className={`group cursor-pointer bg-zinc-900 ${
            !isWishListPage && "sm:rounded-xl"
          }  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto`}
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

            {/* Wishlist Icon */}
            {!isWishListPage && (
              <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full">
                {wishlist ? (
                  <Heart size={18} fill="red" onClick={handleWishList} />
                ) : (
                  <Heart
                    size={18}
                    className="text-black"
                    onClick={handleWishList}
                  />
                )}
              </div>
            )}
            {isWishListPage && (
              <div
                onClick={handleRemoveWishlist}
                className="absolute top-3 right-3 hover:rotate-90 bg-white text-black p-1.5 rounded-full"
              >
                <X size={18} className="" />
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

          {/* Product Info */}
          <div className="p-4 text-left space-y-1">
            <h2 className="sm:text-sm text-xs font-semibold uppercase text-white truncate">
              {item.name}
            </h2>
            <p className="text-xs text-zinc-400 truncate">{item.description}</p>

            {/* Price */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white font-semibold sm:text-lg text-md">
                ₹{item.price}
              </span>
              <span className="line-through text-sm text-zinc-500">
                ₹{item.oldPrice}
              </span>
            </div>
          </div>
          {isWishListPage && (
            <div className="border-t border-gray-300/40 m-2 rounded bg-yellow-400 text-center py-2 px-4 montserrat">
              <button
                onClick={handleAddToBag}
                className="text-black  cursor-pointer uppercase font-semibold"
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

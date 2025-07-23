import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [wishlist, setWishList] = useState(false);

  const handleWishList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishList((prev) => !prev);
  };

  return (
    <div className="w-full sm:auto z-1">
      <Link to={`/product-view/${item.slug}`}>
        <div className="group cursor-pointer bg-zinc-900 sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto">
          {/* Product Image */}
          <div className="relative h-52 sm:h-64 md:h-80 w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Wishlist Icon */}
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
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

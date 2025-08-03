import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <div className="sm:pt-36 px-5 text-center h-screen flex flex-col items-center justify-start text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex items-center justify-center  bg-opacity-20 rounded-full p-6 shadow-xl"
      >
        <Heart size={48} className="text-rose-400 animate-pulse" />
      </motion.div>

      <h2 className="mt-6 text-3xl font-bold text-rose-300">
        Your Wishlist is Empty 💔
      </h2>

      <p className="mt-2 text-base text-gray-400 max-w-md text-center">
        Looks like you haven't added anything to your wishlist yet. Start
        exploring our collections and save your favorites!
      </p>

      <Link
        to={"/collection-all"}
        className="mt-6 px-6 py-3 cursor-pointer bg-amber-400 hover:bg-amber-500 transition text-black font-semibold rounded-xl shadow-lg"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyWishlist;

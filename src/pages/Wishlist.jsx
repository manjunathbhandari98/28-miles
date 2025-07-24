import ProductCard from "../components/common/ProductCard";
import { products } from "../data/products";

const Wishlist = () => {
  const TOTAL_ITEMS = 3;

  return (
    <div className="sm:m-20 m-4 sm:pt-36 pt-16 flex flex-col items-start gap-5">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl text-white font-semibold">My Wishlist </h3>
        <p className="text-sm">
          {TOTAL_ITEMS} {TOTAL_ITEMS > 1 ? "Items" : "Item"}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5 sm:gap-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard item={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

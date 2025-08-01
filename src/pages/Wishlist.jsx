import ProductCard from "../components/common/ProductCard";
import EmptyWishlist from "../components/ui/EmptyWishList";
import LoadingPage from "../components/ui/LoadingPage";
import { useWishList } from "../hooks/useWishList";

const Wishlist = () => {
  const { wishListItems, getWishListCount, loading } = useWishList();
  const TOTAL_ITEMS = getWishListCount();

  if (loading) {
    return <LoadingPage />;
  }

  if (!wishListItems || wishListItems.length === 0 || TOTAL_ITEMS === 0) {
    return (
      <div className="pt-36">
        <EmptyWishlist />
      </div>
    );
  }

  return (
    <div className="sm:m-20 m-4 sm:pt-36 pt-16 flex flex-col items-start gap-5">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl text-white font-semibold">My Wishlist</h3>
        <p className="text-sm text-zinc-400">
          {TOTAL_ITEMS} {TOTAL_ITEMS > 1 ? "Items" : "Item"}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-4">
        {wishListItems.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/ui/CheckoutSteps";
import ErrorPage from "../components/ui/ErrorPage";
import LoadingPage from "../components/ui/LoadingPage";
import { useAuth } from "../hooks/useAuth";
import { moveToWishlist, removeCartItem } from "../service/cartService";
import CartItem from "./../components/common/CartItem";
import { useCart } from "./../hooks/useCart";

const CartPage = () => {
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();
  const {
    cartItems: contextCartItems,
    cart,
    cartId,
    loading,
    handleUpdateQuantity,
    handleRemoveFromCart,
    refreshCart,
  } = useCart();

  // Use cart items from context instead of local state
  const cartItems = contextCartItems;

  useEffect(() => {
    // Optional: Refresh cart when component mounts
    // This ensures we have the latest cart data
    if (!loading && (isAuthenticated || !isAuthenticated)) {
      refreshCart();
    }
  }, []); // Only run once on mount

  const onQuantityUpdate = async (item, quantity) => {
    try {
      await handleUpdateQuantity(
        cartId, // Use cartId from context
        item.productId,
        item.size,
        item.color,
        quantity
      );
      toast.success(`Item Updated`, {
        duration: 4000,
        position: "bottom-center",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await handleRemoveFromCart(cartItemId);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
      setError("Failed to remove item");
    }
  };

  const handleMoveToWishlist = async (item) => {
    try {
      await moveToWishlist(item.productId);
      await removeCartItem(item.cartItemId);
      toast.success("Moved to wishlist");
      // Refresh cart to reflect changes
      await refreshCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to move item");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  // Empty Cart - check if cartItems is array and has items
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center px-4 text-center">
        <img src="/empty-cart.png" alt="empty-cart" className="w-40 md:w-56" />
        <h3 className="text-xl font-semibold mt-4">
          Hey, your bag feels so light!
        </h3>
        <h4 className="text-md text-gray-500">
          Let's add some items to your bag
        </h4>
        <Link
          to="/"
          className="mt-6 w-full sm:w-1/3 bg-yellow-400 text-black font-semibold py-3 px-6 uppercase rounded shadow hover:bg-yellow-300 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Calculate totals from cartItems array
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice - item.price) * item.quantity,
    0
  );
  const totalTax = cartItems.reduce(
    (sum, item) => sum + item.tax * item.quantity,
    0
  );
  const grandTotal = subTotal;

  return (
    <div className="w-full min-h-screen px-4 sm:px-10 py-6 font-sans">
      {/* Top Bar */}
      <div className="hidden sm:flex justify-between items-center mb-8">
        <Link to="/">
          <img src="/28Miles2.png" alt="logo" className="w-20" />
        </Link>
        <CheckoutSteps activeStep={0} />
        <div className="flex gap-2 items-center">
          <img src="/transaction.png" alt="transaction" className="w-5" />
          <span className="text-sm uppercase text-gray-400">100% Payment</span>
        </div>
      </div>

      <Link to={"/"}>
        <div className="inline-block px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold text-center shadow-md hover:bg-amber-600 hover:shadow-lg transition duration-300 ease-in-out my-5">
          ← Back to Home
        </div>
      </Link>

      {/* Cart Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <CartItem
              key={`${item.cartItemId || item.productId}-${item.size}-${
                item.color
              }-${index}`}
              item={item}
              cartItems={cart}
              onUpdateQuantity={onQuantityUpdate}
              onRemove={handleRemoveItem}
              onMoveToWishlist={handleMoveToWishlist}
            />
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-zinc-900 mb-14 md:mb-0 rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Price Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Total MRP (Incl. of Taxes)</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-₹{totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span className="flex gap-1">
                <span className="line-through text-gray-500">₹49</span>
                <span className="text-green-500">Free</span>
              </span>
            </div>
            <hr className="border-t border-gray-700" />
            <div className="flex justify-between text-sm">
              <span>Taxes</span>
              <span>₹{totalTax.toFixed(2)}</span>
            </div>
            <hr className="border-t border-gray-700" />
            <div className="flex justify-between font-semibold text-md">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <p className="text-green-400 text-center text-sm mt-1">
              Yayy! You get FREE delivery on this order 🎉
            </p>
          </div>

          <Link
            to={"/checkout/address"}
            className="mt-6 cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-center text-black font-semibold py-3 rounded uppercase transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

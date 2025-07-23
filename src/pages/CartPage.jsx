import { Link } from "react-router-dom";
import CartItem from "../components/common/CartItem";

const CartPage = () => {
  const cartItems = []; // Dummy items

  if (cartItems.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center px-4 text-center">
        <img src="/empty-cart.png" alt="empty-cart" className="w-40 md:w-56" />
        <h3 className="text-xl font-semibold mt-4">
          Hey, your bag feels so light!
        </h3>
        <h4 className="text-md text-gray-500">
          Let’s add some items to your bag
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

  return (
    <div className="w-full min-h-screen px-4 sm:px-10 py-6 font-sans">
      {/* Top Bar */}
      <div className="hidden sm:flex justify-between items-center mb-8">
        <Link to="/">
          <img src="/28Miles2.png" alt="logo" className="w-20" />
        </Link>
        <div className="flex gap-4 items-center text-sm uppercase">
          <span className="text-green-400 font-semibold">Bag</span>
          <span className="text-gray-400">──────</span>
          <span className="text-gray-400">Address</span>
          <span className="text-gray-400">──────</span>
          <span className="text-gray-400">Payment</span>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/transaction.png" alt="transaction" className="w-5" />
          <span className="text-sm uppercase text-gray-400">100% Payment</span>
        </div>
      </div>

      {/* Cart Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map((item, idx) => (
            <CartItem key={idx} />
          ))}
        </div>

        {/* Price Summary */}
        <div className="bg-zinc-900 mb-14 md:mb-0 rounded-xl shadow-lg p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Price Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Total MRP (Incl. of Taxes)</span>
              <span>₹499</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span>-₹49</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span className="flex gap-1">
                <span className="line-through text-gray-500">₹49</span>
                <span className="text-green-500">Free</span>
              </span>
            </div>
            <hr className="border-t border-gray-700" />
            <div className="flex justify-between font-semibold text-md">
              <span>Total Amount</span>
              <span>₹399</span>
            </div>
            <p className="text-green-400 text-center text-sm mt-1">
              Yayy! You get FREE delivery on this order 🎉
            </p>
          </div>
          <button className="mt-6 cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded uppercase transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

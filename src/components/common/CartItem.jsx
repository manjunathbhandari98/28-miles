const CartItem = () => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <img src="/gallery-1.jpg" alt="" className="w-full sm:w-32 rounded" />

        {/* Info */}
        <div className="flex flex-col w-full gap-2 justify-between">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold">Denim Jacket T-shirt</h2>
              <p className="text-sm text-gray-400">Casual Wears</p>
              <p className="text-sm">
                Delivered by:{" "}
                <span className="text-green-400 font-medium">23 July</span>
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-lg font-bold">₹449</h3>
              <h3 className="text-sm text-gray-500 line-through">₹999</h3>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex gap-1">
              <span className="text-sm text-gray-400">Color:</span>
              <span className="text-sm font-medium">Green</span>
            </div>
            <div className="flex gap-1">
              <span className="text-sm text-gray-400">Size:</span>
              <span className="text-sm font-medium">S</span>
            </div>
            <div className="flex gap-1">
              <span className="text-sm text-gray-400">Quantity:</span>
              <select className="text-xs  rounded border-0 outline-0 text-white">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num} className="text-black ">
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-700 mt-4 pt-3 flex justify-between text-sm text-gray-400">
            <button className="hover:text-red-400 transition">Remove</button>
            <button className="hover:text-yellow-400 transition">
              Move to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import { ChevronLeft, ShoppingBag, Truck, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD10245",
      status: "Delivered",
      items: [
        { name: "Oversized Graphic Tee", quantity: 1 },
        { name: "Loose Fit Cargo Pants", quantity: 1 },
      ],
      totalAmount: 2198,
      date: "2025-07-15",
    },
    {
      id: "ORD10287",
      status: "Processing",
      items: [{ name: "Minimalist Hoodie", quantity: 1 }],
      totalAmount: 1499,
      date: "2025-07-21",
    },
    {
      id: "ORD10293",
      status: "Shipped",
      items: [
        { name: "Vintage Denim Jacket", quantity: 1 },
        { name: "Beanie Hat", quantity: 2 },
      ],
      totalAmount: 2899,
      date: "2025-07-22",
    },
    {
      id: "ORD10293",
      status: "Shipped",
      items: [
        { name: "Vintage Denim Jacket", quantity: 1 },
        { name: "Beanie Hat", quantity: 2 },
      ],
      totalAmount: 2899,
      date: "2025-07-22",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white md:hidden">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 p-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="text-lg font-semibold">Manage Orders</h3>
        <div></div>
      </div>

      {/* Scrollable Content */}
      <div className="my-16 px-4 py-6 space-y-6 overflow-y-auto scrollbar-hide flex-1">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-10 space-y-4 text-gray-400">
            <ShoppingBag size={48} className="text-gray-600" />
            <p className="text-sm">No orders placed yet.</p>
            <button className="bg-white text-black px-5 py-2.5 text-sm rounded-lg shadow hover:bg-gray-100 active:scale-[0.98] transition flex items-center gap-2">
              <Truck size={18} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-300">
                    Order #{order.id}
                  </h3>
                  <span className="text-xs text-yellow-400 font-medium">
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-400">
                  <p>{order.items.length} items</p>
                  <p>Total: ₹{order.totalAmount}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    Placed on: {order.date}
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-500 transition">
                    View Details
                  </button>
                  <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-500 transition flex items-center gap-1">
                    <XCircle size={14} />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

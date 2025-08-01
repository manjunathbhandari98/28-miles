import { Banknote, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const OrdersTab = () => {
  const orders = []; // Empty list

  return (
    <div className="text-white space-y-6">
      <h2 className="text-xl font-semibold">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 space-y-2 text-gray-400">
          <ShoppingBag size={40} />
          <p>No orders yet.</p>
          <Link
            to={"/collection-all"}
            className="bg-white cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm shadow-sm space-y-1"
          >
            <h3 className="text-lg font-semibold">{order.id}</h3>
            <p className="text-sm text-gray-400">Placed on {order.date}</p>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="flex items-center gap-2">
                <Truck size={16} /> Status: {order.status}
              </span>
              <span className="flex items-center gap-2">
                <Banknote size={16} /> {order.payment}
              </span>
              <span>Total: {order.total}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTab;

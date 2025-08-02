import {
  Banknote,
  ReceiptText,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getOrders } from "../../service/orderService";
import LoadingPage from "../ui/LoadingPage";

function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  const dt = new Date(dateStr);
  return dt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const OrdersTab = () => {
  const [orders, setOrders] = useState([]); // Empty list
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrders(user.userId);
        setOrders(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <LoadingPage />;

  return (
    <div className="text-white space-y-6 w-full mx-auto">
      <h2 className="text-2xl font-bold tracking-wide mb-2">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 space-y-3 text-gray-400">
          <ShoppingBag size={48} />
          <p className="text-lg font-medium">No orders yet.</p>
          <Link
            to={"/collection-all"}
            className="bg-gradient-to-tr from-pink-500 to-fuchsia-600 cursor-pointer text-white px-5 py-2 rounded-full font-bold tracking-wide hover:scale-105 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="relative p-5 mt-5 bg-gradient-to-br from-zinc-900 via-zinc-800 to-gray-900 border border-zinc-700 rounded-2xl shadow-xl space-y-4"
          >
            {/* Order Head */}
            <div className="flex justify-between items-center gap-2">
              <div>
                <div className="flex items-center text-fuchsia-400 gap-2 font-bold">
                  <ReceiptText size={18} />
                  <span>
                    Order{" "}
                    <span className="tracking-wider">{order.orderId}</span>
                  </span>
                </div>
                <div className="text-zinc-400 text-xs mt-1">
                  Placed: {formatDateTime(order.orderDate)}
                </div>
              </div>
              <div className="flex flex-col text-xs items-end gap-1">
                <span
                  className={`flex items-center gap-1 font-bold uppercase
                  ${
                    order.status === "CONFIRMED"
                      ? "text-green-400"
                      : order.status === "CANCELLED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                `}
                >
                  <Truck size={16} />
                  {order.status}
                </span>
                <span className="flex items-center gap-1 text-green-300">
                  <Banknote size={15} />
                  {order.paymentMethod}{" "}
                  {order.paymentDetails?.paymentStatus === "COMPLETED"
                    ? "✓"
                    : ""}
                </span>
              </div>
            </div>
            {/* Items */}
            <div className="flex flex-col gap-3 mt-3">
              {order.items.map((item) => (
                <div
                  key={item.orderItemId}
                  className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/70 shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-700"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="text-md font-medium text-white">
                      {item.productName}
                    </div>
                    <div className="flex gap-3 mt-0.5 text-sm text-zinc-400">
                      <span>Qty: {item.quantity}</span>
                      {item.size && <span>| Size: {item.size}</span>}
                      {item.color && <span>| Color: {item.color}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-pink-400">
                      ₹{item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Delivery and Payment */}
            <div className="flex justify-between bg-zinc-900 rounded-xl p-4 mt-2 border-t border-zinc-800 shadow-inner">
              <div>
                <div className="font-semibold text-zinc-300 flex items-center gap-2">
                  <UserRound size={16} /> Delivery:
                </div>
                <div className="text-sm text-zinc-400 mt-0.5">
                  {order.shippingAddress?.fullName} <br />
                  {order.shippingAddress?.street}, {order.shippingAddress?.city}
                  , {order.shippingAddress?.state} -{" "}
                  {order.shippingAddress?.postalCode}
                  <br />
                  {order.shippingAddress?.phone}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="font-semibold text-zinc-300">
                    Total Amount
                  </div>
                  <div className="font-bold text-lg text-green-400">
                    ₹{order.totalAmount}
                  </div>
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  Payment: {order.paymentMethod} <br />
                  Payment ID:{" "}
                  <span className="font-mono">
                    {order.paymentDetails?.razorpayPaymentId || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTab;

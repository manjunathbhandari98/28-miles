import { ChevronRight, ReceiptText, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getOrders } from "../../service/orderService";
import { formatDateToReadable } from "../../utils/formatedDate";
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
  const navigate = useNavigate();

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
    <div className="text-white pt-12 space-y-6 w-full mx-auto">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 space-y-3 text-gray-400">
          <ShoppingBag size={48} />
          <p className="text-lg font-medium">No orders yet.</p>
          <Link
            to={"/collection-all"}
            className="bg-gradient-to-tr from-yellow-500 to-yellow-600 cursor-pointer text-white px-5 py-2 rounded font-bold tracking-wide hover:scale-105 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold tracking-wide mb-2">Your Orders</h2>
          {orders.map((order) => (
            <>
              <div
                key={order.orderId}
                onClick={() => navigate(`/my-profile/order/${order.orderId}`)}
                className="relative p-5 mt-5 bg-zinc-900/30 cursor-pointer shadow-xl space-y-4"
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
                  <ChevronRight />
                </div>
                {/* Items */}
                <div className="flex flex-col gap-3 mt-3">
                  {order.items.map((item) => (
                    <div
                      key={item.orderItemId}
                      className="flex gap-4 p-3 shadow hover:shadow-lg transition"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded-lg border border-zinc-700"
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
                        <div className="flex gap-2 text-xs text-zinc-500 mt-1">
                          <span>
                            Placed on: {formatDateToReadable(order.orderDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;

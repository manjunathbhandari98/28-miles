import {
  ChevronLeft,
  CircleCheck,
  PackageCheck,
  PackageSearch,
  ReceiptText,
  ShoppingBag,
  Truck,
  UserRound,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getOrders } from "../../../service/orderService";
import LoadingPage from "../../ui/LoadingPage";
import { formatDateToReadable } from "./../../../utils/formatedDate";

// Status badge styles
const statusStyles = {
  CONFIRMED: {
    text: "Confirmed",
    color: "bg-green-600/80 text-white",
    icon: <CircleCheck size={16} />,
  },
  DELIVERED: {
    text: "Delivered",
    color: "bg-green-700 text-white",
    icon: <PackageCheck size={16} />,
  },
  SHIPPED: {
    text: "Shipped",
    color: "bg-blue-600 text-white",
    icon: <Truck size={16} />,
  },
  PROCESSING: {
    text: "Processing",
    color: "bg-yellow-500 text-black",
    icon: <PackageSearch size={16} />,
  },
  CANCELLED: {
    text: "Cancelled",
    color: "bg-red-600 text-white",
    icon: <XCircle size={16} />,
  },
};

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
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

  // automatically redirect to /my-profile when screen size is md or larger.

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate("/my-profile", { replace: true });
      }
    };

    // Check immediately when mounted
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-col min-h-screen mx-4 bg-black text-white md:hidden">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 px-4 py-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="text-base font-semibold tracking-wide">Orders</h3>
        <div />
      </div>

      {/* Scrollable Content */}
      <div className="mt-16 px-2 pb-8 pt-3 space-y-5 overflow-y-auto scrollbar-hide flex-1">
        {orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-12 space-y-4 text-gray-400">
            <ShoppingBag size={48} className="text-gray-600" />
            <p className="text-base">No orders placed yet.</p>
            <button
              onClick={() => navigate("/collection-all")}
              className="bg-white text-black px-5 py-2.5 text-base rounded-full shadow hover:bg-gray-100 active:scale-[0.98] transition flex items-center gap-2"
            >
              <Truck size={20} />
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const badge =
                statusStyles[order.status?.toUpperCase()] ||
                statusStyles.CONFIRMED;

              return (
                <div
                  key={order.orderId}
                  className="p-4 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-800 rounded-2xl shadow-lg space-y-2"
                >
                  {/* Header: Order ID / Date / Status badge */}
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        <ReceiptText size={16} /> #{order.orderId}
                      </h4>
                      <span className="block text-xs text-zinc-400 mt-1">
                        Placed: {formatDateToReadable(order.orderDate)}
                      </span>
                    </div>
                    <div
                      className={`flex gap-1 items-center px-2.5 py-1 rounded-2xl text-xs font-medium shadow ${badge.color}`}
                    >
                      {badge.icon} <span>{badge.text}</span>
                    </div>
                  </div>
                  {/* Product Details */}
                  <div className="flex flex-col gap-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-zinc-900 rounded-xl px-3 py-2"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded-md border border-zinc-800"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium text-white text-sm">
                            {item.productName}
                          </div>
                          <div className="flex gap-2 text-xs text-zinc-400 mt-0.5">
                            <span>Qty: {item.quantity}</span>
                            {item.size && <span>| Size: {item.size}</span>}
                            {item.color && <span>| Color: {item.color}</span>}
                          </div>
                        </div>
                        <div className="font-semibold text-pink-400 text-base">
                          ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Prices / Status */}
                  <div className="flex justify-between items-end mt-1">
                    <div className="text-xs text-zinc-400">
                      Payment:{" "}
                      <span className="capitalize">{order.paymentMethod}</span>
                      {order.paymentDetails?.paymentStatus === "COMPLETED"
                        ? " ✓"
                        : ""}
                    </div>
                    <div className="text-right font-bold text-lg text-green-400">
                      ₹{order.totalAmount}
                    </div>
                  </div>
                  {/* Delivery Address */}
                  <div className="bg-zinc-800 mt-3 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-sm text-zinc-300 mb-1">
                      <UserRound size={16} />
                      <span>Deliver to {order.shippingAddress?.fullName}</span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      {order.shippingAddress?.street},{" "}
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state} -{" "}
                      {order.shippingAddress?.postalCode}
                      <br />
                      {order.shippingAddress?.phone}
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 justify-end mt-2">
                    <button
                      className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg shadow active:scale-[0.97] transition"
                      onClick={() => navigate(`/order/${order.orderId}`)}
                    >
                      View Details
                    </button>
                    {order.status === "CONFIRMED" && (
                      <button className="text-xs flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-500 font-semibold rounded-lg shadow active:scale-[0.97] transition">
                        <XCircle size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

import { ChevronLeft, ReceiptText, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  cancelOrder,
  getOrderById,
  getOrders,
  trackOrder,
} from "../../service/orderService";
import LoadingPage from "../ui/LoadingPage";
import TrackOrder from "./TrackOrder";

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

const OrderView = () => {
  const [order, setOrder] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getOrderById(orderId);
        setOrder(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, orderId]);

  useEffect(() => {
    if (!orderId) return;
    const fetchTrackData = async () => {
      try {
        setLoading(true);
        const res = await trackOrder(orderId);
        setTrackData(res);
      } catch (error) {
        console.error("Error fetching track data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackData();
  }, [orderId]);

  const isCancelable = (status) => {
    return ["PENDING", "CONFIRMED", "PROCESSING"].includes(status);
  };

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      const res = await getOrders(user.userId);
      setOrder(res);
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Something went wrong while canceling the order.");
    }
  };

  if (loading || !order || !trackData) return <LoadingPage />;

  return (
    <div className="text-white space-y-6 md:p-10 p-2 w-full mx-auto">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 px-4 py-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div />
      </div>

      {/* Order Card */}
      <div
        key={order.orderId}
        className="relative p-5 mt-10 rounded-2xl shadow-xl space-y-4"
      >
        {/* Order Head */}
        <div className="flex justify-between items-center gap-2">
          <div>
            <div className="flex items-center text-yellow-400 gap-2 font-bold">
              <ReceiptText size={18} />
              <span>
                Order <span className="tracking-wider">{order.orderId}</span>
              </span>
            </div>
            <div className="text-zinc-400 text-xs mt-1">
              Placed: {formatDateTime(order.orderDate)}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="flex flex-col gap-3 mt-3">
          {order.items?.map((item) => (
            <div
              key={item.orderItemId}
              className="flex items-center gap-4 p-3 border-zinc-900 shadow hover:shadow-lg transition"
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
            </div>
          ))}
        </div>

        {/* Delivery & Payment */}
        <div className="flex justify-between p-4 mt-2 border-t border-zinc-800 shadow-inner">
          <div>
            <div className="font-semibold text-zinc-300 flex items-center gap-2">
              <UserRound size={16} /> Delivery:
            </div>
            <div className="text-sm text-zinc-400 mt-0.5">
              {order.shippingAddress?.fullName} <br />
              {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state} -{" "}
              {order.shippingAddress?.postalCode}
              <br />
              {order.shippingAddress?.phone}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="font-semibold text-zinc-300">Total Amount</div>
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

        {/* Cancel Button */}
        <div className="flex w-full justify-end">
          {isCancelable(order.status) && (
            <button
              onClick={() => handleCancel(order.orderId)}
              className="mt-4 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-sm text-sm font-semibold transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Track Order */}
      {trackData && <TrackOrder trackData={trackData} />}
    </div>
  );
};

export default OrderView;

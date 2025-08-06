/* eslint-disable no-unused-vars */
import { ChevronLeft, ReceiptText, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  cancelOrder,
  getOrderById,
  getReturnsByUser,
  requestReturn,
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

const cancelReasons = [
  "Ordered by mistake",
  "Changed my mind",
  "Found a better price elsewhere",
  "Delivery time too long",
  "Need to update shipping address",
  "Placed duplicate order",
  "Other",
];

const returnReasons = [
  "Wrong item delivered",
  "Item arrived damaged or defective",
  "Item is not as described",
  "Received extra item I didn’t order",
  "Product quality not satisfactory",
  "Item arrived too late",
  "Changed my mind",
  "Found a better price elsewhere",
  "Size/fit issue",
  "Other",
];

const OrderView = () => {
  const [order, setOrder] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [mode, setMode] = useState("return"); // or "cancel"
  const [selectedReason, setSelectedReason] = useState(0);
  const [customReason, setCustomReason] = useState("");

  const { user } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !orderId) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orderRes, trackRes, returnRes] = await Promise.all([
          getOrderById(orderId),
          trackOrder(orderId),
          getReturnsByUser(user.userId),
        ]);
        setOrder(orderRes);
        setTrackData(trackRes);
        setReturnedOrders(returnRes);
      } catch (err) {
        toast.error("Error loading order details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, orderId]);

  const isCancelable = (status) =>
    ["PENDING", "CONFIRMED", "PROCESSING"].includes(status);

  const isReturnAvailable = () =>
    returnedOrders?.some((r) => r.orderId === orderId);

  const isReturnable = (status, deliveredAt) => {
    if (status !== "DELIVERED" || !deliveredAt) return false;
    const deliveredDate = new Date(deliveredAt);
    deliveredDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    deliveredDate.setDate(deliveredDate.getDate() + 7);
    return now <= deliveredDate;
  };

  const handleCancel = async () => {
    try {
      await cancelOrder(order.orderId);
      toast.success("Order cancelled");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  const handleReturn = async () => {
    const reasonList = returnReasons;
    const reason =
      selectedReason === reasonList.length - 1
        ? customReason || "Other"
        : reasonList[selectedReason];

    if (selectedReason === reasonList.length - 1 && !customReason) {
      return toast.error("Please provide a reason");
    }

    try {
      const returnData = {
        userId: user.userId,
        orderId: order.orderId,
        reason,
      };
      await requestReturn(returnData);
      toast.success("Return request submitted");
      setReasonModalOpen(false);
    } catch {
      toast.error("Return request failed");
    }
  };

  const reasons = mode === "return" ? returnReasons : cancelReasons;
  const showCustomInput = selectedReason === reasons.length - 1;
  const wordCount = customReason.trim().split(/\s+/).length;

  if (loading || !order || !trackData) return <LoadingPage />;

  return (
    <div className="text-white space-y-6 md:p-10 p-2 w-full mx-auto">
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 px-4 py-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
      </div>

      <div className="relative p-5 mt-10 rounded-2xl shadow-xl space-y-4">
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

        {/* Items */}
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
                <div className="text-md font-medium">{item.productName}</div>
                <div className="text-sm text-zinc-400">
                  Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="flex justify-between p-4 border-t border-zinc-800 shadow-inner">
          <div>
            <div className="font-semibold text-zinc-300 flex items-center gap-2">
              <UserRound size={16} /> Delivery:
            </div>
            <div className="text-sm text-zinc-400 mt-0.5">
              {order.shippingAddress?.fullName}, {order.shippingAddress?.street}
              , {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
              {order.shippingAddress?.postalCode}
              <br />
              {order.shippingAddress?.phone}
            </div>
          </div>
          <div>
            <div className="font-semibold text-zinc-300">Total</div>
            <div className="text-green-400 font-bold text-lg">
              ₹{order.totalAmount}
            </div>
            <div className="text-xs text-zinc-500 mt-2">
              Payment: {order.paymentMethod}
              <br />
              Payment ID: {order.paymentDetails?.razorpayPaymentId || "-"}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          {isCancelable(order.status) && (
            <button
              onClick={() => {
                setMode("cancel");
                setReasonModalOpen(true);
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded"
            >
              Cancel Order
            </button>
          )}
          {isReturnable(order.status, order.deliveredAt) &&
            !isReturnAvailable() && (
              <button
                onClick={() => {
                  setMode("return");
                  setReasonModalOpen(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white rounded"
              >
                Return Order
              </button>
            )}
        </div>
      </div>

      <TrackOrder trackData={trackData} />

      {reasonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setReasonModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-white text-lg font-semibold mb-4">
              Choose a reason
            </h2>

            {reasons.map((reason, index) => (
              <div
                key={index}
                onClick={() => setSelectedReason(index)}
                className="flex items-center gap-3 mt-3 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedReason === index
                      ? "bg-yellow-400"
                      : "border-gray-400"
                  }`}
                >
                  {selectedReason === index && (
                    <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  )}
                </div>
                <span className="text-sm">{reason}</span>
              </div>
            ))}

            {showCustomInput && (
              <div className="mt-4">
                <textarea
                  rows={3}
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-3 text-sm border rounded bg-zinc-800 text-white"
                  placeholder="Write your reason here..."
                />
                <div className="text-xs mt-1 text-gray-400">
                  {wordCount} / 50 words
                </div>
              </div>
            )}

            <button
              onClick={mode === "cancel" ? handleCancel : handleReturn}
              className="bg-yellow-500 mt-5 w-full py-2 rounded text-white font-semibold hover:bg-yellow-600"
            >
              {mode === "cancel" ? "Cancel My Order" : "Return My Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderView;

/* eslint-disable no-unused-vars */
import { ChevronLeft, ReceiptText, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  cancelOrder,
  getOrderById,
  getOrders,
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

const OrderView = () => {
  const [order, setOrder] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [mode, setMode] = useState();
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const { user } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();
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
  const [selectedReason, setSelectedReason] = useState(0);
  const [returnStatus, setReturnStatus] = useState([]);

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

  const fetchReturnByUser = async () => {
    try {
      setLoading(true);
      const res = await getReturnsByUser(user.userId);
      setReturnedOrders(res);
    } catch (error) {
      setReturnedOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchReturnByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(() => {
  //   if (!returnedOrders) return;
  //   const fetchStatus = async (orderId) => {
  //     try {
  //       const res = await getReturnStatus(orderId);
  //       setReturnStatus(res);
  //     } catch (error) {
  //       setReturnStatus("");
  //     }
  //   };
  //   fetchStatus();
  // }, [returnedOrders]);

  const isCancelable = (status) => {
    return ["PENDING", "CONFIRMED", "PROCESSING"].includes(status);
  };

  const isReturnAvailable = () => {
    if (!orderId || !returnStatus) return false;
    return returnedOrders?.some((order) => order.orderId == orderId);
  };

  const isReturnable = (status, deliveredAtString) => {
    if (status !== "DELIVERED") return false;
    if (!deliveredAtString) return false;

    const deliveredAt = new Date(deliveredAtString);
    const now = new Date();

    // Normalize time to midnight
    deliveredAt.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const returnDeadline = new Date(deliveredAt);
    returnDeadline.setDate(returnDeadline.getDate() + 7);

    return now <= returnDeadline;
  };

  const [text, setText] = useState("");

  const wordCount = text.match(/\b[-?(\w+)?]+\b/gi)?.length || 0;

  const onReturnClick = () => {
    setMode("return");
    setReasonModalOpen(true);
  };

  const onCancelClick = () => {
    setMode("cancel");
    setReasonModalOpen(true);
  };

  const handleCancel = async () => {
    try {
      await cancelOrder(order.orderId);
      const res = await getOrders(user.userId);
      setOrder(res);
      navigate(-1);
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Something went wrong while canceling the order.");
    }
  };

  const handleReturn = async () => {
    try {
      const reason =
        selectedReason === returnReasons.length - 1
          ? text || "Other"
          : returnReasons[selectedReason];

      const returnData = {
        userId: user.userId,
        orderId: order.orderId,
        reason: reason,
      };
      await requestReturn(returnData);
      setReasonModalOpen(false);
      fetchReturnByUser();
    } catch (error) {
      toast.error("Return Request failed");
    }
  };

  if (loading || !order || !trackData || !returnedOrders)
    return <LoadingPage />;

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
        <div className="flex justify-between">
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
          {isReturnAvailable() && (
            <div className="mt-4 px-4 py-2 rounded-sm text-sm font-semibold transition">
              Return Proccessing
            </div>
          )}
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
              onClick={onCancelClick}
              className="mt-4 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-sm text-sm font-semibold transition"
            >
              Cancel Order
            </button>
          )}
          {isReturnable(order.status, order.deliveredAt) &&
            !isReturnAvailable() && (
              <button
                onClick={onReturnClick}
                className="mt-4 px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-sm text-sm font-semibold transition"
              >
                Return Order
              </button>
            )}
        </div>
      </div>

      {/* Track Order */}
      {trackData && <TrackOrder trackData={trackData} />}

      {reasonModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 relative border border-zinc-900 rounded-xl shadow-2xl p-6 w-11/12 max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide text-center">
            <button
              onClick={() => setReasonModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-white text-lg font-semibold mb-6">
              Choose The reason
            </h3>

            {returnReasons.map((reason, index) => (
              <div
                key={index}
                onClick={() => setSelectedReason(index)}
                className="flex mt-5 cursor-pointer gap-3 items-center"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 
    ${
      selectedReason == index
        ? "bg-yellow-400 shadow-lg"
        : "bg-gray-300 hover:bg-gray-400"
    }
  `}
                >
                  {selectedReason == index && (
                    <div className="bg-zinc-800 w-3.5 h-3.5 rounded-full shadow-inner transform scale-100 transition-transform duration-300"></div>
                  )}
                </div>

                <h2 className="text-sm">{reason}</h2>
              </div>
            ))}

            {/* other reason */}
            {selectedReason === returnReasons.length - 1 && (
              <div className="flex flex-col mt-4 max-w-sm mx-auto">
                <textarea
                  id="comment"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your comment here..."
                  className="resize-none p-4 border border-gray-300 rounded-lg shadow-sm transition"
                />
                <div
                  className={`mt-1 text-sm ${
                    wordCount >= 50
                      ? "text-red-500 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {wordCount} / {50} words
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={mode == "return" ? handleReturn : handleCancel}
                className="bg-yellow-500 mt-4 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
              >
                {mode == "return" ? "Return My Order" : "Cancel My Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderView;

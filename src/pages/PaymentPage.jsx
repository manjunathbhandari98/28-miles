import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/ui/LoadingPage";
import { AddressModalContext } from "../context/AddressModalContext";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import {
  createRazorpayOrder,
  loadRazorpayScript,
  verifyPayment,
} from "../service/paymentService";

const PaymentPage = () => {
  const { orderId } = useParams(); // Get orderId from URL params
  const { cartItems = [], cart = { grandTotal: 0 } } = useCart();
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedAddress } = useContext(AddressModalContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      setError("Order ID not found");
      return;
    }

    const createOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load Razorpay script first
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load Razorpay SDK");
        }

        const payload = {
          amount: Math.round(cart.grandTotal), // Ensure it's an integer
          currency: "INR",
          customerId: user?.userId,
          orderId: orderId, // Pass your internal order ID
        };

        const response = await createRazorpayOrder(payload);
        console.log("Razorpay order response:", response);

        if (response?.id) {
          setRazorpayOrderId(response.id); // Use 'id' not 'razorpayOrderId'
        } else {
          throw new Error("Failed to create Razorpay order");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        setError(error.message || "Failed to create payment order");
      } finally {
        setIsLoading(false);
      }
    };

    createOrder();
  }, [cart.grandTotal, orderId, user?.userId]);

  const handlePayment = async () => {
    if (!razorpayOrderId) {
      setError("Payment order not ready");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(cart.grandTotal * 100), // Amount in paise
        currency: "INR",
        name: "28 Miles",
        description: `Order ${orderId}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          console.log("Payment Success", response);
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: selectedAddress?.fullName || user?.name || "Customer",
          email: selectedAddress?.email || user?.email || "",
          contact: selectedAddress?.phone || user?.phone || "",
        },
        notes: {
          order_id: orderId,
          customer_id: user?.userId,
        },
        theme: {
          color: "#0f172a",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed");
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment Failed", response.error);
        handlePaymentFailure(response.error);
      });

      rzp.open();
    } catch (error) {
      console.error("Error opening payment:", error);
      setError("Failed to open payment gateway");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      console.log("Verifying payment...", paymentResponse);

      const verificationData = {
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        razorpaySignature: paymentResponse.razorpay_signature,
        orderId: orderId, // Your internal order ID
      };

      const verificationResult = await verifyPayment(verificationData);
      console.log("Payment verified:", verificationResult);

      // Navigate to success page with the verified order data
      navigate("/payment-success", {
        state: {
          ...paymentResponse,
          orderDetails: verificationResult,
          orderId: orderId,
        },
      });
    } catch (error) {
      console.error("Payment verification failed:", error);
      setError("Payment verification failed. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    setError(
      `Payment failed: ${error.description || error.reason || "Unknown error"}`
    );
    setIsLoading(false);
  };

  if (isLoading) return <LoadingPage />;

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Payment Error
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>

        {/* Order ID Display */}
        <div className="bg-zinc-800 rounded-xl p-4 shadow-lg mb-6">
          <div className="text-center">
            <p className="text-gray-400">Order ID</p>
            <p className="text-xl font-bold text-yellow-400">{orderId}</p>
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Items in Your Order</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-400">No items in your cart.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={item.id || item.productId || index}
                  className="flex items-center justify-between border-b border-gray-700 pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/fallback.jpg"}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-400">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Address Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          {selectedAddress ? (
            <div className="text-gray-300 leading-relaxed">
              <p className="font-semibold">{selectedAddress.fullName}</p>
              <p>{selectedAddress.street}</p>
              <p>
                {selectedAddress.city}, {selectedAddress.state} -{" "}
                {selectedAddress.postalCode}
              </p>
              <p>Phone: {selectedAddress.phone}</p>
              {selectedAddress.email && <p>Email: {selectedAddress.email}</p>}
            </div>
          ) : (
            <p className="text-gray-400">No address selected.</p>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <span>Subtotal:</span>
              <span>₹{cart.grandTotal?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold border-t pt-2">
              <span>Total Amount:</span>
              <span className="text-yellow-400">
                ₹{cart.grandTotal?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>

          <button
            className="w-full py-3 cursor-pointer bg-yellow-600 hover:bg-yellow-500 rounded-lg text-white font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePayment}
            disabled={!razorpayOrderId || isLoading}
          >
            {isLoading
              ? "Processing..."
              : `Pay ₹${cart.grandTotal?.toFixed(2) || "0.00"}`}
          </button>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white underline"
            >
              ← Back to Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

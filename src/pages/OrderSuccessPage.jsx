import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/ui/LoadingPage";
import { useCart } from "../hooks/useCart";
import { getCurrentOrders } from "../service/orderService";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef();
  const { refreshCart } = useCart();

  useEffect(() => {
    if (!orderId) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getCurrentOrders(orderId);
        setOrder(res);
        refreshCart();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [orderId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
      <head>
        <title>Order Receipt</title>
        <link rel="stylesheet" href="/src/index.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
        <style>
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body class="bg-gray-900 text-white">
        <div class="p-6">
          ${printContents}
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  if (loading || !order) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-900 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div ref={receiptRef} className="print">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center">
            <div className="inline-block bg-yellow-600 shadow-lg rounded-full p-4 animate-bounce">
              <svg
                className="w-9 h-9 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-3 mb-1 tracking-wide text-yellow-400 drop-shadow">
              Order Placed Successfully!
            </h1>
            <p className="text-zinc-400 mb-4 text-base text-center">
              Your Cash on Delivery order has been placed.
              <br />
              We'll notify you once it's shipped!
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900/80 rounded-xl p-5 mb-4 shadow-inner space-y-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order ID:</span>
                <span className="text-white font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Date:</span>
                <span>{today}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Amount Payable:</span>
                <span className="text-yellow-300 font-semibold">
                  ₹{order.totalAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Mode:</span>
                <span className="text-zinc-300 font-medium">
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t border-zinc-700 mt-2 pt-2 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-300 mb-1">
                Shipping Address:
              </div>
              <div>
                {order.shippingAddress
                  ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`
                  : "-"}
              </div>
              <div className="mt-2">
                <div className="font-semibold text-zinc-300 mb-1">
                  Customer:
                </div>
                <div>
                  {order.shippingAddress?.fullName || "-"}
                  <br />
                  {order.shippingAddress?.email && (
                    <span>{order.shippingAddress.email}</span>
                  )}
                  {order.shippingAddress?.phone && (
                    <span> | {order.shippingAddress.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-zinc-900/80 rounded-xl shadow-inner p-4 mb-4">
            <div className="font-semibold text-zinc-300 mb-2">
              Items Ordered:
            </div>
            <ul className="divide-y divide-zinc-800">
              {order.items?.length > 0 ? (
                order.items.map((prod, idx) => (
                  <li
                    key={prod.productId || idx}
                    className="py-1 flex justify-between"
                  >
                    <span className="text-white">
                      {prod.productName}
                      {prod.size && (
                        <span className="ml-2 bg-zinc-800 rounded px-2 py-0.5 text-xs text-zinc-400">
                          Size: {prod.size}
                        </span>
                      )}
                      {prod.color && (
                        <span className="ml-2 bg-zinc-800 rounded px-2 py-0.5 text-xs text-zinc-400">
                          Color: {prod.color}
                        </span>
                      )}
                    </span>
                    <span className="text-zinc-400">
                      x{prod.quantity}
                      <span className="text-zinc-500 ml-2">₹{prod.price}</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-zinc-500">No product details</li>
              )}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-tr from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
          >
            <Download />
            Print Receipt
          </button>
          <button
            onClick={() => {
              navigate("/");
              refreshCart();
            }}
            className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-5 rounded-lg shadow transition"
          >
            Back to Home
          </button>
          <button
            onClick={() => {
              navigate("/my-profile");
              refreshCart();
            }}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-5 rounded-lg shadow transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

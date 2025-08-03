import { ChevronLeft, ChevronRight, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { getOrders } from "../../../service/orderService";
import { formatDateToReadable } from "../../../utils/formatedDate";
import LoadingPage from "../../ui/LoadingPage";

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
    <div className="flex flex-col min-h-screen bg-black text-white md:hidden">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 px-4 py-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="text-base font-semibold tracking-wide">Orders</h3>
        <div />
      </div>

      {/* Scrollable Content */}
      <div className="mt-16 pb-8 overflow-y-auto scrollbar-hide flex-1">
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
            {orders.map((order) => (
              <div key={order.orderId} className="shadow-lg space-y-2">
                {/* Header: Order ID / Date / Status badge */}

                {/* Product Details */}
                <div className="flex flex-col gap-2">
                  {order.items.map((item, i) => (
                    <div
                      onClick={() =>
                        navigate(`/my-profile/order/${order.orderId}`)
                      }
                      key={i}
                      className="flex gap-3 px-2 py-4 border-b-8 border-zinc-950"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-18 h-18 object-cover rounded-md border border-zinc-800"
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
                        <div className="flex gap-2 text-xs text-zinc-500 mt-1">
                          <span>
                            Placed on: {formatDateToReadable(order.orderDate)}
                          </span>
                        </div>
                      </div>
                      <div className="font-semibold text-gray-400 text-base">
                        <ChevronRight />
                      </div>
                    </div>
                  ))}
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

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BorderInputBox from "../components/ui/BorderInputBox";
import CheckoutSteps from "../components/ui/CheckoutSteps";
import { AddressModalContext } from "../context/AddressModalContext";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { getAddress } from "../service/addressService";
import { placeOrders } from "../service/orderService";
import LoadingPage from "./../components/ui/LoadingPage";
import { RUPEE_SYMBOL } from "./../utils/ruppeSymbol";

const Address = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cart } = useCart();
  const { selectedAddress, setSelectedAddress } =
    useContext(AddressModalContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      navigate("/checkout/cart");
      return;
    }

    const fetchUserAddress = async () => {
      try {
        setLoading(true);
        const res = await getAddress(user.userId);
        setAddresses(res || []);
      } catch (error) {
        console.error("Error fetching address:", error);
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddress();
  }, [user, cartItems, navigate]);

  const amountPayable =
    (cart.grandTotal || 0) + (selectedMethod === 0 ? 0 : 60);

  // Validation function
  const validateForm = () => {
    const required = [
      "firstName",
      "lastName",
      "phone",
      "street",
      "city",
      "state",
      "country",
      "postalCode",
    ];
    for (let field of required) {
      if (!formData[field]?.trim()) {
        setError(
          `${field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} is required`
        );
        return false;
      }
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }

    // Email validation if provided
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    try {
      setError(null);

      if (!validateForm()) {
        return;
      }

      setOrderLoading(true);

      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Format items with proper total calculation
      const formattedItems = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity, // Add total field
        image: item.image,
      }));

      const orderData = {
        userId: user.userId,
        items: formattedItems,
        shippingAddress: {
          fullName,
          phone: formData.phone,
          email: formData.email || null,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        totalAmount: amountPayable,
        paymentMethod: selectedMethod === 0 ? "ONLINE" : "CASH",
        deliveryCharges: selectedMethod === 0 ? 0 : 60,
      };

      console.log("Placing order with data:", orderData);
      const res = await placeOrders(orderData);
      const orderId = res?.orderId;

      console.log("Order response:", res);

      if (orderId) {
        // Store order data in context for payment page
        setSelectedAddress({
          ...selectedAddress,
          fullName,
          phone: formData.phone,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        });

        if (selectedMethod === 0) {
          // Navigate to payment page for online payment
          navigate(`/checkout/payment/${orderId}`);
        } else {
          // For COD, clear cart and go to success page
          navigate(`/order-success/${orderId}`);
        }
      } else {
        throw new Error("Order ID not returned from server");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message || "Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  // Handle selecting/deselecting address card
  const handleSelectAddress = (address) => {
    if (selectedAddress?.addressId === address.addressId) {
      // Deselect and clear form
      setSelectedAddress(null);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      });
    } else {
      // Select and populate form
      setSelectedAddress(address);
      const nameParts = (address.fullName || "").trim().split(" ");
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: address.phone || "",
        email: address.email || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        postalCode: address.postalCode || "",
      });
    }
    setError(null); // Clear any previous errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user starts typing
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-10 py-6 font-sans">
      {/* Top Bar */}
      <div className="hidden sm:flex justify-between items-center mb-8">
        <Link to="/">
          <img src="/28Miles2.png" alt="logo" className="w-20" />
        </Link>
        <CheckoutSteps activeStep={1} />
        <div className="flex gap-2 items-center">
          <img src="/transaction.png" alt="transaction" className="w-5" />
          <span className="text-sm uppercase text-gray-400">100% Payment</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Address Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 py-10">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>

          {/* Saved Addresses */}
          {addresses.length > 0 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {addresses.map((address) => {
                const isSelected =
                  selectedAddress?.addressId === address.addressId;
                return (
                  <div
                    key={address.addressId}
                    onClick={() => handleSelectAddress(address)}
                    className={`border rounded-md w-auto p-4 cursor-pointer transition
                    ${
                      isSelected
                        ? "border-white shadow-lg bg-zinc-900"
                        : "border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    <h3 className="font-semibold text-md mb-1">
                      {address.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {address.street}, {address.city}, {address.state} -{" "}
                      {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: +91 {address.phone}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Address Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <BorderInputBox
              label="First Name *"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="Last Name *"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="Phone Number *"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Address *"
              name="street"
              placeholder="123 Main Street"
              className="md:col-span-2"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="City *"
              name="city"
              placeholder="Bangalore"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="State *"
              name="state"
              placeholder="Karnataka"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="Country *"
              name="country"
              placeholder="India"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="ZIP / Postal Code *"
              name="postalCode"
              placeholder="560001"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </form>

          {/* Shipping Method */}
          <h2 className="text-xl font-semibold mt-10">
            Payment & Delivery Method
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                id: 0,
                title: "Online Payment",
                subtitle: "Pay now & get free delivery",
                fee: "FREE Delivery",
              },
              {
                id: 1,
                title: "Cash On Delivery",
                subtitle: "Pay when you receive",
                fee: `${RUPEE_SYMBOL}60 Delivery Charge`,
              },
            ].map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative flex items-center justify-between gap-4 border rounded-xl p-4 cursor-pointer transition duration-200
                ${
                  selectedMethod === method.id
                    ? "border-white bg-zinc-800/50 shadow-md"
                    : "border-gray-400/30 hover:border-white hover:bg-gray-700/20"
                }`}
              >
                {/* Radio dot */}
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                    {selectedMethod === method.id && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-400">{method.subtitle}</p>
                  <p className="text-sm text-yellow-400 font-medium">
                    {method.fee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mb-14 md:mb-0 rounded-xl shadow-lg p-6 flex flex-col gap-20">
          <div className="space-y-6 text-white">
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
              Your Cart ({cartItems.length} items)
            </h2>

            <div className="flex flex-col gap-6 mt-6 max-h-80 overflow-y-auto">
              {cartItems.map((items, index) => (
                <div
                  key={items.productId || index}
                  className="flex justify-between items-start bg-gray-800/60 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex relative gap-4">
                    <img
                      src={items.image}
                      alt={items.productName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="absolute -top-2 left-12 flex justify-center items-center w-5 h-5 text-xs font-bold bg-yellow-400 text-black rounded-full shadow-sm">
                      {items.quantity}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">
                        {items.productName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {items.size} | {items.color}
                      </p>
                      <p className="text-sm text-gray-400">
                        {RUPEE_SYMBOL}
                        {items.price} each
                      </p>
                    </div>
                  </div>

                  <div className="text-md font-bold text-yellow-400 mt-2">
                    {RUPEE_SYMBOL}
                    {(items.price * items.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="flex flex-col mt-10 gap-4 p-5 shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-300">Subtotal</span>
                <span className="text-base font-medium text-white">
                  {RUPEE_SYMBOL}
                  {(cart.grandTotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-300">
                  Delivery Charges
                </span>
                <span className="text-base font-medium text-white">
                  {selectedMethod === 0 ? "Free" : `${RUPEE_SYMBOL}60`}
                </span>
              </div>
              {cart.totalTax > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-300">Tax</span>
                  <span className="text-base font-medium text-white">
                    {RUPEE_SYMBOL}
                    {(cart.totalTax || 0).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                <span className="text-lg font-semibold text-white">
                  Subtotal
                </span>
                <span className="text-base font-medium text-white">
                  {RUPEE_SYMBOL}
                  {cart.totalTax + cart.grandTotal}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                <span className="text-lg font-bold text-yellow-400">Total</span>
                <span className="text-lg font-bold text-yellow-400">
                  {RUPEE_SYMBOL}
                  {amountPayable}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="mt-6 cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-center text-black font-semibold py-3 rounded uppercase transition"
          >
            {selectedMethod === 0 ? "Continue Payment" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;

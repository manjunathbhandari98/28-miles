import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BorderInputBox from "../components/ui/BorderInputBox";
import CheckoutSteps from "../components/ui/CheckoutSteps";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { getAddress } from "../service/addressService";
import LoadingPage from "./../components/ui/LoadingPage";
import { RUPEE_SYMBOL } from "./../utils/ruppeSymbol";

const Address = () => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
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
  const { user } = useAuth();
  const { cartItems, cart } = useCart();

  useEffect(() => {
    if (!user) return;

    const fetchUserAddress = async () => {
      try {
        setLoading(true);
        const res = await getAddress(user.userId);
        setAddresses(res);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddress();
  }, [user]);

  if (loading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

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
      setFormData({
        firstName: address.fullName.trim().split(" ")[0] || "",
        lastName: address.fullName.trim().split(" ").slice(1).join(" ") || "",
        phone: address.phone || "",
        email: address.email || "",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        postalCode: address.postalCode || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      {/* Address Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 py-10">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            {addresses?.map((address) => {
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
                  : "border-zinc-700"
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

          <form className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            <BorderInputBox
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Phone Number"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Address"
              name="street"
              placeholder="123 Main Street"
              className="md:col-span-2"
              value={formData.street}
              onChange={handleChange}
            />
            <BorderInputBox
              label="City"
              name="city"
              placeholder="Bangalore"
              value={formData.city}
              onChange={handleChange}
            />
            <BorderInputBox
              label="State"
              name="state"
              placeholder="Karnataka"
              value={formData.state}
              onChange={handleChange}
            />
            <BorderInputBox
              label="Country"
              name="country"
              placeholder="India"
              value={formData.country}
              onChange={handleChange}
            />
            <BorderInputBox
              label="ZIP / Postal Code"
              name="postalCode"
              placeholder="560001"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </form>

          <h2 className="text-xl font-semibold mt-10">Shipping Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { id: 0, title: "Online Payment", fee: "FREE" },
              { id: 1, title: "Cash On Delivery", fee: `${RUPEE_SYMBOL}60` },
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
                <div className="flex flex-col">
                  <h3 className="text-base font-semibold text-white">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-300">{method.fee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className=" mb-14 md:mb-0 rounded-xl shadow-lg p-6 flex flex-col gap-20">
          <div className="space-y-6 text-white">
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
              Your Cart
            </h2>

            <div className="flex flex-col gap-6 mt-6">
              {cartItems.map((items, index) => (
                <div
                  key={index}
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
                      <p className="text-sm text-gray-400">{items.category}</p>
                    </div>
                  </div>

                  <div className="text-md font-bold text-yellow-400 mt-2">
                    {RUPEE_SYMBOL}
                    {items.price * items.quantity}
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
                  {cart.grandTotal + cart.totalTax}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-300">Shipping</span>
                <span className="text-base font-medium text-white">
                  {selectedMethod == 0 ? "Free" : `${RUPEE_SYMBOL}60`}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-300">Estimated Tax</span>
                <span className="text-base font-medium text-white">
                  {RUPEE_SYMBOL}
                  {cart.totalTax}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-lg font-bold text-yellow-400">
                  {RUPEE_SYMBOL}
                  {cart.grandTotal + (selectedMethod == 0 ? 0 : 60)}
                </span>
              </div>
            </div>
          </div>

          <Link
            to={"/checkout/payment"}
            className="mt-6 cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-center text-black font-semibold py-3 rounded uppercase transition"
          >
            Continue Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Address;

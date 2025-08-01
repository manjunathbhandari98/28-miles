/* eslint-disable no-unused-vars */
import { Check, X } from "lucide-react"; // Or any close icon you use
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddressModalContext } from "../../context/AddressModalContext";
import { addAddress } from "../../service/addressService";
import BorderInputBox from "./BorderInputBox";

const AddressModalPage = ({ user }) => {
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const {
    onCloseAddressModal,
    loadAddresses,
    selectedAddress,
    setSelectedAddress,
  } = useContext(AddressModalContext);

  useEffect(() => {
    if (!selectedAddress) return;

    setFormData({
      fullName: selectedAddress.fullName,
      phone: selectedAddress.phone,
      email: selectedAddress.email,
      street: selectedAddress.street,
      city: selectedAddress.city,
      state: selectedAddress.state,
      country: selectedAddress.country,
      postalCode: selectedAddress.postalCode,
    });
  }, [selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = {
      ...formData,
      isDefult: defaultAddress,
    };

    try {
      await addAddress(user.userId, addressData);
      toast.success("Address Saved Successfully");
      loadAddresses();
      onCloseAddressModal();
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      });
    } catch (error) {
      toast.error("Failed to save address!");
    }
  };

  const onClose = () => {
    onCloseAddressModal();
    setSelectedAddress();
  };

  const onSetDefult = () => {
    setDefaultAddress((prev) => !prev);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-black w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h2 className="text-white text-xl font-semibold" id="modal-title">
            {selectedAddress ? `Editing ${formData.fullName}` : "Add Address"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-white transition rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form - scrollable if overflow */}
        <form
          onSubmit={handleSubmit}
          className="p-6 flex-grow overflow-y-auto scrollbar-hide space-y-5 no-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BorderInputBox
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <BorderInputBox
              label="Phone Number"
              name="phone"
              placeholder="+91 98765 43210"
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
              label="ZIP / Postal Code"
              name="postalCode"
              placeholder="560001"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          <BorderInputBox
            label="Address"
            name="street"
            placeholder="123 Main Street"
            value={formData.street}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BorderInputBox
              label="City"
              name="city"
              placeholder="Bangalore"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="State"
              name="state"
              placeholder="Karnataka"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <BorderInputBox
              label="Country"
              name="country"
              placeholder="India"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-3 px-2 items-center">
            <div
              onClick={onSetDefult}
              className={`border border-gray-50 ${
                defaultAddress && "bg-blue-600"
              } w-5 h-5 cursor-pointer flex items-center justify-center font-bold`}
            >
              {defaultAddress && <Check size={14} />}
            </div>
            <h2 className="text-lg">Set as primary address</h2>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg py-3 transition"
          >
            {selectedAddress ? "Update " : "Save "} Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModalPage;

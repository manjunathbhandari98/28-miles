/* eslint-disable no-unused-vars */
import { Edit3, Home, MapPin, PlusCircle, Trash, X } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AddressModalContext } from "../../context/AddressModalContext";
import { deleteAddress } from "../../service/addressService";
import LoadingPage from "../ui/LoadingPage";

const AddressesTab = () => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const {
    onOpenAddressModal,
    addresses,
    loadAddresses,
    loading,
    setSelectedAddress,
  } = useContext(AddressModalContext);

  const handleAddressSelect = (addressId) => {
    setDeleteConfirmationModalOpen(true);
    setSelectedAddressId(addressId);
  };

  const handleAddressModal = () => {
    onOpenAddressModal();
  };

  const handleAddressDelete = async () => {
    try {
      await deleteAddress(selectedAddressId);
      toast.success("Address Deleted Successfully");
      setDeleteConfirmationModalOpen(false);
      loadAddresses();
    } catch (error) {
      toast.error("Failed to Delete Address");
    }
  };

  const handleEditAddress = async (address) => {
    setSelectedAddress(address);
    onOpenAddressModal();
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="text-white w-full space-y-7 mx-auto">
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center mt-20 w-full text-gray-400">
          <MapPin size={44} className="text-white-500" />
          <p className="text-lg">No saved addresses yet.</p>

          <button
            onClick={handleAddressModal}
            className="inline-flex items-center gap-2 mt-2 bg-pink-800 hover:bg-pink-700 text-white px-5 py-2 rounded-lg cursor-pointer font-semibold shadow transition"
          >
            <PlusCircle size={18} />
            Add your first address
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {addresses.map((address) => (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h2 className="text-2xl font-semibold tracking-wide">
                  Saved Addresses
                </h2>
                {addresses.length < 3 && (
                  <button
                    onClick={handleAddressModal}
                    className="inline-flex items-center gap-2 bg-gradient-to-tr text-black from-white to-gray-100 px-4 py-2 rounded-xl shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white-400 cursor-pointer transition"
                  >
                    <PlusCircle size={18} />
                    Add Address
                  </button>
                )}
              </div>
              <div
                key={address.addressId}
                className="flex items-start justify-between gap-5 bg-gradient-to-tr from-zinc-900 to-zinc-800/70 border border-zinc-700 px-5 py-4 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Home className="text-fuchsia-400" size={18} />
                    <span className="font-bold text-lg">
                      {address.fullName}
                    </span>
                  </div>
                  <p className="text-zinc-200 text-sm">
                    {address.street}, {address.city}, {address.state}
                    {"  "}
                    <span className="text-zinc-400 font-mono">
                      - {address.postalCode}
                    </span>
                  </p>
                  <p className="text-zinc-300 text-xs">
                    Phone: <span className="font-mono">+91</span>{" "}
                    {address.phone}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-fuchsia-400 bg-zinc-800 hover:bg-zinc-700/80 rounded-lg font-medium shadow-sm transition"
                    title="Edit address"
                  >
                    <Edit3 size={15} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleAddressSelect(address.addressId)}
                    className="inline-flex items-center gap-1 px-3 py-1 text-red-400 bg-zinc-800 hover:bg-zinc-700/80 rounded-lg font-medium shadow-sm transition"
                    title="Delete Address"
                  >
                    <Trash size={15} />
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      )}

      {deleteConfirmationModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 w-11/12 max-w-md text-center">
            <button
              onClick={() => setDeleteConfirmationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-white text-lg font-semibold mb-6">
              Are you sure you want to Delete this Address?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddressDelete}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirmationModalOpen(false)}
                className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressesTab;

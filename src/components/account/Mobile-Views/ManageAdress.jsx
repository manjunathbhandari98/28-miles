/* eslint-disable no-unused-vars */
import {
  ChevronLeft,
  Edit3,
  Home,
  MapPin,
  PlusCircle,
  Trash,
  X,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AddressModalContext } from "../../../context/AddressModalContext";
import { useAuth } from "../../../hooks/useAuth";
import { deleteAddress } from "../../../service/addressService";
import AddressModalPage from "../../ui/AddressModal";
import LoadingPage from "../../ui/LoadingPage";

const ManageAddress = () => {
  const navigate = useNavigate();
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { user } = useAuth();
  const {
    onOpenAddressModal,
    addresses,
    loadAddresses,
    loading,
    setSelectedAddress,
    addressModalOpen,
  } = useContext(AddressModalContext);

  const handleAddressSelect = (addressId) => {
    setDeleteConfirmationModalOpen(true);
    setSelectedAddressId(addressId);
  };

  const handleAddressModal = () => {
    setSelectedAddress(null); // Clear selected address for Add mode
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

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    onOpenAddressModal();
  };

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
    <div className="md:hidden flex flex-col min-h-screen bg-zinc-950 text-white p-4 pt-20 space-y-6">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-zinc-950 px-4 py-4 flex justify-between items-center shadow-md">
        <ChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h3 className="text-base font-semibold tracking-wide">Addresses</h3>
        <div />
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 space-y-4 text-zinc-400 px-6">
          <MapPin size={48} className="text-zinc-600" />
          <p className="text-base text-center">
            You haven’t added any addresses yet.
          </p>
          <button
            onClick={handleAddressModal}
            className="mt-2 inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white px-4 py-2 rounded-lg transition"
          >
            <PlusCircle size={18} />
            Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.addressId}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2 hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <Home className="text-zinc-500" size={18} />
                <h2 className="font-medium text-base text-zinc-100 truncate">
                  {address.fullName}
                </h2>
              </div>
              <p className="text-zinc-400 text-sm leading-snug">
                {address.street}, {address.city}, {address.state}{" "}
                <span className="font-mono text-zinc-500">
                  - {address.postalCode}
                </span>
              </p>
              <p className="text-zinc-500 text-xs">
                Phone: <span className="font-mono">+91</span> {address.phone}
              </p>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="flex items-center gap-1 text-sm text-zinc-200 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-md px-3 py-1.5 transition"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleAddressSelect(address.addressId)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 border border-zinc-700 hover:border-zinc-600 rounded-md px-3 py-1.5 transition"
                >
                  <Trash size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fixed Add Button */}
      <button
        onClick={handleAddressModal}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full font-medium text-sm shadow-md transition"
      >
        <PlusCircle size={20} />
        Add Address
      </button>

      {/* Delete Confirmation Modal */}
      {deleteConfirmationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-xl p-6 max-w-sm w-full shadow-xl relative">
            <button
              onClick={() => setDeleteConfirmationModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition"
            >
              <X size={18} />
            </button>
            <h3 className="text-zinc-100 text-base font-semibold mb-6 text-center">
              Are you sure you want to delete this address?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddressDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmationModalOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {addressModalOpen && <AddressModalPage user={user} />}
    </div>
  );
};

export default ManageAddress;

import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAddress } from "../service/addressService";

const AddressModalContext = createContext();

export const AddressModalProvider = ({ children }) => {
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();

  const loadAddresses = async () => {
    if (!user) return;

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

  useEffect(() => {
    if (!user) return;
    loadAddresses();
  }, [user]);

  const onOpenAddressModal = () => {
    setAddressModalOpen(true);
  };

  const onCloseAddressModal = () => {
    setAddressModalOpen(false);
  };

  return (
    <AddressModalContext.Provider
      value={{
        addressModalOpen,
        onOpenAddressModal,
        onCloseAddressModal,
        loading,
        addresses,
        setAddresses,
        loadAddresses,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AddressModalContext.Provider>
  );
};

export { AddressModalContext };

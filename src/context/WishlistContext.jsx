import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  addToWishList,
  deleteWishList,
  getWishListByUser,
  removeProductFromWishList,
  toggleProductInWishList,
} from "../service/wishListService";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState([]);
  const [wishList, setWishList] = useState(null);
  const [wishListId, setWishListId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const loadWishList = async () => {
      setLoading(true);

      try {
        if (isAuthenticated && user?.userId) {
          // Authenticated user wishlist
          const wishListData = await getWishListByUser(user.userId);
          setWishList(wishListData);
          setWishListItems(wishListData?.products || []);
          setWishListId(wishListData?.wishListId || null);
        } else if (!isAuthenticated) {
          // Guest user - clear wishlist
          setWishList(null);
          setWishListItems([]);
          setWishListId(null);
        } else {
          // User is authenticating, wait for complete auth state
          setWishList(null);
          setWishListItems([]);
          setWishListId(null);
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err);
        // Set empty wishlist on error
        setWishList(null);
        setWishListItems([]);
        setWishListId(null);
      } finally {
        setLoading(false);
      }
    };

    loadWishList();
  }, [isAuthenticated, user?.userId]);

  const handleAddToWishList = async (productId) => {
    try {
      if (!isAuthenticated || !user?.userId) {
        throw new Error("Please login to add items to wishlist");
      }

      const updatedWishList = await addToWishList(user.userId, productId);
      setWishList(updatedWishList);
      setWishListItems(updatedWishList?.products || []);
      setWishListId(updatedWishList?.wishListId || null);
    } catch (err) {
      console.error("Add to wishlist failed:", err);
      throw err; // Re-throw to handle in UI
    }
  };

  const handleRemoveFromWishList = async (productId) => {
    try {
      if (!isAuthenticated || !user?.userId) {
        throw new Error("Please login to manage wishlist");
      }

      const updatedWishList = await removeProductFromWishList(
        user.userId,
        productId
      );
      setWishList(updatedWishList);
      setWishListItems(updatedWishList?.products || []);
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
      throw err;
    }
  };

  const handleToggleWishList = async (productId) => {
    try {
      if (!isAuthenticated || !user?.userId) {
        throw new Error("Please login to manage wishlist");
      }

      const updatedWishList = await toggleProductInWishList(
        user.userId,
        productId
      );
      setWishList(updatedWishList);
      setWishListItems(updatedWishList?.products || []);
      setWishListId(updatedWishList?.wishListId || null);
    } catch (err) {
      console.error("Toggle wishlist failed:", err);
      throw err;
    }
  };

  const handleClearWishList = async () => {
    try {
      if (!isAuthenticated || !user?.userId || !wishListId) {
        throw new Error("Cannot clear wishlist");
      }

      await deleteWishList(wishListId);
      setWishList(null);
      setWishListItems([]);
      setWishListId(null);
    } catch (err) {
      console.error("Clear wishlist failed:", err);
      throw err;
    }
  };

  const isInWishList = (productId) => {
    return wishListItems.some((item) => item.productId === productId);
  };

  const getWishListCount = () => {
    return wishListItems.length;
  };

  // Refresh wishlist function for manual refresh
  const refreshWishList = async () => {
    setLoading(true);
    try {
      if (isAuthenticated && user?.userId) {
        const wishListData = await getWishListByUser(user.userId);
        setWishList(wishListData);
        setWishListItems(wishListData?.products || []);
        setWishListId(wishListData?.wishListId || null);
      } else {
        setWishList(null);
        setWishListItems([]);
        setWishListId(null);
      }
    } catch (err) {
      console.error("Failed to refresh wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishListContext.Provider
      value={{
        wishListItems,
        wishList,
        wishListId,
        loading,
        handleAddToWishList,
        handleRemoveFromWishList,
        handleToggleWishList,
        handleClearWishList,
        isInWishList,
        getWishListCount,
        refreshWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export { WishListContext };

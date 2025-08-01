import { useContext } from "react";
import { WishListContext } from "../context/WishlistContext";

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("useWishList must be used within an WishList Provider");
  }
  return context;
};

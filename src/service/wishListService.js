import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const addToWishList = async (userId, productId) => {
  try {
    const response = await apiClient.post("/wishlist", {
      userId,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Add to wishlist error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add product to wishlist"
    );
  }
};

export const getWishListByUser = async (userId) => {
  try {
    const response = await apiClient.get(`/wishlist/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // Return empty wishlist if not found
      return {
        wishListId: null,
        userId,
        products: [],
      };
    }
    console.error("Get wishlist error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch wishlist"
    );
  }
};

export const removeProductFromWishList = async (userId, productId) => {
  try {
    const response = await apiClient.delete(
      `/wishlist/user/${userId}/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to remove product from wishlist"
    );
  }
};

export const deleteWishList = async (wishListId) => {
  try {
    const response = await apiClient.delete(`/wishlist/${wishListId}`);
    return response.data;
  } catch (error) {
    console.error("Delete wishlist error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete wishlist"
    );
  }
};

export const isProductInWishList = async (userId, productId) => {
  try {
    const response = await apiClient.get(
      `/wishlist/user/${userId}/product/${productId}/exists`
    );
    return response.data;
  } catch (error) {
    console.error("Check wishlist status error:", error);
    return false;
  }
};

export const toggleProductInWishList = async (userId, productId) => {
  try {
    const response = await apiClient.post(
      `/wishlist/user/${userId}/product/${productId}/toggle`
    );
    return response.data;
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to toggle product in wishlist"
    );
  }
};

export const getWishListCount = async (userId) => {
  try {
    const wishlist = await getWishListByUser(userId);
    return wishlist.products ? wishlist.products.length : 0;
  } catch (error) {
    console.error("Get wishlist count error:", error);
    return 0;
  }
};

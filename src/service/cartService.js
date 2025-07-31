import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addToCart = async (cartData) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`, cartData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartItems = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGuestCartItems = async (cartId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cart/guest/${cartId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (cartId, cartData) => {
  try {
    const response = await axios.put(`${BASE_URL}/cart/${cartId}`, cartData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCartItemQuantity = async (
  cartId,
  productId,
  size,
  color,
  quantity
) => {
  const response = await axios.put(
    `${BASE_URL}/cart/update-quantity`,
    {},
    {
      params: {
        cartId,
        productId,
        size,
        color,
        quantity,
      },
    }
  );
  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await axios.delete(`${BASE_URL}/cart/item/${cartItemId}`);
  return response.data;
};

export const moveToWishlist = async (userId, productId) => {
  const response = await axios.post(`/api/wishlist`, {
    userId,
    productId,
  });
  return response.data;
};

export const mergeCartItem = async (guestCartId, userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cart/merge?guestCartId=${guestCartId}&userId=${userId}`,
      "",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const generateGuestCartId = () => {
  const newId = crypto.randomUUID(); // or any unique ID generator
  localStorage.setItem("guestCartId", newId);
  return newId;
};

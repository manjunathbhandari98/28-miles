import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export const getReviews = async (productId, page = 0, size = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reviews/product/${productId}?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

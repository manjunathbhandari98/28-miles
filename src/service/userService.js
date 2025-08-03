import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/${userId}`,
      updatedData,
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

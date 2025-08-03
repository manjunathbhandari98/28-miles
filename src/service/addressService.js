import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

export const getAddress = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/addresses?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addAddress = async (userId, addressData) => {
  try {
    await axios.post(`${BASE_URL}/addresses/${userId}`, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    await axios.put(`${BASE_URL}/addresses/update/${addressId}`, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteAddress = async (addressId) => {
  try {
    await axios.delete(`${BASE_URL}/addresses/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

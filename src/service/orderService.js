import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

export const placeOrders = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentOrders = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const trackOrder = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/track/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (orderId) => {
  try {
    await axios.delete(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const requestReturn = async (returnData) => {
  try {
    await axios.post(`${BASE_URL}/return/request`, returnData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReturnsByUser = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/return/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getReturnStatus = async (orderId) => {
  try {
    const res = axios.get(`${BASE_URL}/return/status/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

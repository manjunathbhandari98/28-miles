import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createRazorpayOrder = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/create-order`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return just the data, not the full response
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error; // Throw error so calling component can handle it
  }
};

export const verifyPayment = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/payment/verify`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Helper function to load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

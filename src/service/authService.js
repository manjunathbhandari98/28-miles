import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (registerData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/register`,
      registerData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login?email=${email}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/verify?email=${email}&otp=${otp}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

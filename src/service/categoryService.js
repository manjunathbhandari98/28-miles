import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesByGender = async (gender) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/gender?gender=${gender}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/slug?slug=${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

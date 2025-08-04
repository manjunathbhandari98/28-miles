import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async (
  page = 0,
  size = 10,
  gender = null,
  category = null
) => {
  const params = { page, size };

  if (gender) params.gender = gender;
  if (category) params.categorySlug = category;

  try {
    const response = await axios.get(`${BASE_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchNewProducts = async (page = 0, size = 10) => {
  const params = { page, size };

  try {
    const response = await axios.get(`${BASE_URL}/products/new-arrivals`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);

    throw error;
  }
};

export const fetchProductByCategoryandGender = async (slug, gender) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products?categorySlug=${slug}&gender=${gender}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);

    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);

    throw error;
  }
};

export const getSimilarProducts = async (categoryId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/products/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

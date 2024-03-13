import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

export const getProducts = async () => {
  try {
    const res = await API.get("products");
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message,
    };
  }
};

export const addProduct = async (product) => {
  try {
    const res = await API.post("products", product);
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await API.get(`products/${id}`);
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const updateProduct = async (product) => {
  try {
    const res = await API.put(`products/${product.id}`, product);
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const DeleteProductbyId = async (id) => {
  try {
    const res = await API.delete(`products/${id}`);
    return {
      success: true,
      data: res.data,
      error: null,      
    };
  } catch (error) {
    return {  
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getUsers = async () => {
  try {
    const res = await API.get("users");
    return {
      sucess: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message,
    };
  }
};

export const getSellers = async () => {
  try {
    const res = await API.get("sellers");
    return {
      sucess: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message,
    };
  }
};

export const registerUser = async (userObj) => {
  try {
    const res = await API.post("users", userObj);

    return {
      sucess: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message,
    };
  }
};

export const registerSeller = async (sellerObj) => {
  try {
    const res = await API.post("sellers", sellerObj);

    return {
      sucess: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message,
    };
  }
};

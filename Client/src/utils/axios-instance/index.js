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
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const getSellers = async () => {
  try {
    const res = await API.get("sellers");
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const registerUser = async (userObj) => {
  try {
    const res = await API.post("users", userObj);

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const registerSeller = async (sellerObj) => {
  try {
    const res = await API.post("sellers", sellerObj);

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const res = await API.patch(`users/${updatedUser.id}`, updatedUser);
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
export const updateSeller = async (updatedSeller) => {
  try {
    const res = await API.patch(`sellers/${updatedSeller.id}`, updatedSeller);
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

export const getOrders = async () => {
  try {
    const res = await API.get("orders");

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
}

export const registerOrder = async(ordersObj) => {
  try {
    const res = await API.post("orders", ordersObj);

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
}
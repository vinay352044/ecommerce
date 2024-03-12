import axios from "axios";

export const API = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export const getUsers = async () => {
  try {
    const res = await API.get("users");
    return {
      sucess: true,
      data: res.data,
      error: null
    }
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message
    }
  }
}

export const getSellers = async () => {
  try {
    const res = await API.get("sellers");
    return {
      sucess: true,
      data: res.data,
      error: null
    }
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message
    }
  }
}

export const registerUser = async (userObj) => {
  try{
    const res = await API.post("users", userObj);
    
    return{
      sucess: true,
      data: res.data,
      error: null
    }
  } catch (error) {
    return {
      sucess: false,
      data: [],
      error: error.message
    }
  }
}
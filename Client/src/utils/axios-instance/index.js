import axios from "axios";

export const API = axios.create({
  baseURL: 'http://localhost:3000/products',
  timeout: 5000
})
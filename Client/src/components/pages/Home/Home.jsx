import React, { useState, useEffect } from "react";
import "./home.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productActions";

import Products from "./Products.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const { seller, admin } = useSelector((state) => state.role);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProductData());
    seller ? navigate('/seller-dashboard') : admin ? navigate('/admin') : null; 
  }, []);

  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <div className="home">
      <Products productData={productData} isAddToCart={true} />
    </div>
  );
};

export default Home;

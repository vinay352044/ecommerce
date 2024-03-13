import React, { useState,useEffect } from "react";
import "./home.css";


import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productActions";
import ProductCard from "./Products.jsx";
import Products from "./Products.jsx";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

  const products = useSelector((state) => state.productReducer.products);
  
  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <div className="home">
      <h1 className="text-3xl">Home</h1>
      <Products productData={productData} isAddToCart={true}/>
    </div>
  );
};

export default Home;

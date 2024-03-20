import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productActions";

import Products from "./Products.jsx";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6">
      <Products productData={productData} isAddToCart={true} />
    </div>
  );
};

export default Home;

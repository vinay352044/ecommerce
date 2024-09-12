import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../../redux/actions/productActions";
import Products from "./Products.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.productReducer.products);
  const { seller, admin } = useSelector((state) => state.role);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    seller
      ? navigate("/seller-dashboard/pendingorders")
      : admin
      ? navigate("/admin")
      : null;
  }, []);

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);

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

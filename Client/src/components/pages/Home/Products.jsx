import React from "react";
import Pagination from "../../common/Pagination";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
} from "../../../redux/actions/productActions";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from "../../common/Product.jsx";



const Products = ({ productData, isAddToCart }) => {
  
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  function favourite() {
    console.log("clicked");
  }
  const indexOfLastRecord = currentPage * recordsPerPage; // for ex : 1*2=2
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // for ex = 2-2=0
  const currentProducts = productData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  ); // slice is exclusive of last record, returns a shallow copy,original array would not be modified
  const nPages = Math.ceil(productData.length / recordsPerPage);

  function handleClick(product) {
    if (isAddToCart) {
      dispatch(addToCart(product));
      toast.success("Product Added to the Cart!", {
        position: 'top-right',
      });
    } else {
      dispatch(removeFromCart(product.id));
      toast.success("Product Removed from the cart!", {
        position: 'top-right',
      });
    }
  }
  return (
    <>
   
      <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
        {currentProducts.map((product, key) => {
          return (
            <Product product={product} handleClick={handleClick} isAddToCart={isAddToCart}/>
          );
        })}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Products;

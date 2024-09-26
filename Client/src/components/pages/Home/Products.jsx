import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import {
  addProductInCart,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import Sorting from "../../common/Sorting";
import Product from "./Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searching from "../../common/Searching";
import Input from "../../common/Input";

const Products = ({ productData, isAddToCart }) => {
  const user = useSelector((state) => state.role.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const [searchResults, setSearchResults] = useState([]);
  const [sortingResult, setSortingResult] = useState([]);
  const dispatch = useDispatch();

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const role = JSON.parse(localStorage.getItem("role")) || "";
  const isLoggedIn = role.isAuth;
  const handleClick = (product) => {
    if (isAddToCart) {
      if (isLoggedIn) {
        dispatch(addProductInCart(product));
      } else {
        toast.warning("Please Login!!");
      }
    } else {
      dispatch(removeFromCart(product.id));
      toast.success("Removed from the cart!", {
        position: "top-right",
      });
    }
  };

  const shouldRenderPagination = sortingResult.length > recordsPerPage;

  return (
    <>
      <div className="display flex justify-center space-x-10">
        <Searching
          dataToSearch={productData}
          setSearchResults={setSearchResults}
        />
        <Sorting
          setSortingResult={setSortingResult}
          searchResults={searchResults}
        />
      </div>
      <br />
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 h-2/3">
        {sortingResult.length > 0 ? (
          sortingResult
            .slice(indexOfFirstRecord, indexOfLastRecord)
            .map((product) => (
              <Product
                product={product}
                key={product.id}
                handleClick={handleClick}
                isAddToCart={isAddToCart}
              />
            ))
        ) : (
          <div className="justify-center">Oops not found</div>
        )}
      </div>
      {shouldRenderPagination && (
        <div className="flex justify-center items-center w-auto h-10 my-6">
          <Pagination
            nPages={Math.ceil(sortingResult.length / recordsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Products;

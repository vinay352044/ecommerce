import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import useDebounceHook from "../../../utils/custom-hooks/useDebounce";
import {
  addProductInCart,
  addToCart,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import Sorting from "../../common/Sorting";
import Product from "../../common/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searching from "../../common/Searching";

const Products = ({ productData, isAddToCart }) => {
  const user = useSelector((state) => state.role.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  // const debouncedSearchQuery = useDebounceHook(searchQuery, 500);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const sortedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  const currentProducts = sortedProducts.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(sortedProducts.length / recordsPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortingChange = (order) => {
    setSortOrder(order);
  };

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

  const shouldRenderPagination = sortedProducts.length > recordsPerPage;

  return (
    <>
      <div className="display flex justify-center space-x-10">
        <Searching
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          productData={productData}
          setFilteredProducts={setFilteredProducts}
        />
        <Sorting handleSortingChange={handleSortingChange} />
      </div>
      <br />
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 h-2/3">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
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
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Products;

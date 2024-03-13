import React, { useState, useEffect } from "react";
import { CiHeart, CiUnread } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import useDebounceHook from "../../common/useDebounceHook";
import {
  addToCart,
  removeFromCart,
} from "../../../redux/actions/productActions";
import Sorting from "../../common/Sorting";
import { API } from "../../../utils/axios-instance";

const ProductCard = ({ productData, isAddToCart }) => {
  const user = useSelector((state) => state.role.user);
  console.log(user); // getting user object here
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const dispatch = useDispatch();
  const debouncedSearchQuery = useDebounceHook(searchQuery, 500);
  const fun = async (newUser) => {
    await API.patch("/users", newUser);
  };

  //////////////////////////////////////////////////////////////

  const heartHandle = async (item) => {
    const updatedUser = { ...user }; // created a copy of user object

    // Check if the item is already in the favouriteProducts array
    // const isAlreadyLiked = updatedUser.favouriteProducts.some(product => product.id === item.id);

    // console.log('alread likeds',isAlreadyLiked)

    // // If the item is not already liked, add it to the favouriteProducts array
    // if (!isAlreadyLiked) {
    //     updatedUser.favouriteProducts = [...updatedUser.favouriteProducts, item];
    //    console.log(updatedUser)
    //     fun(updatedUser); // Send a PATCH request to update the user's favourite products in the backend
    // }

    // check if the user has already liked the product or not
    console.log('user', user)
    const alreaydLiked = user.favouriteProducts.filter(
      (product) => product.id === item.id
    );

    if (alreaydLiked.length === 0) {
      user.favouriteProducts.push(item);

      try {
          const data = await API.patch(`/users/${user.id}`, user);
            console.log(data);
      } catch (error) {
        console.log(error);
      }

    }
  };

  ///////////////////////////////////////////////////////////////

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredProducts = productData.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

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

  const handleClick = (product) => {
    if (isAddToCart) {
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  const shouldRenderPagination = sortedProducts.length > recordsPerPage;

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <br />

      <Sorting handleSortingChange={handleSortingChange} />
      <br />
      <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <button className="justify-items-end h-5 w-6">
              <CiHeart onClick={() => heartHandle(product)} />
              {/* passing our selected favourite product when user clicks on it as argument */}
            </button>
            <a href={`http://localhost:3000/products/${product.id}`}>
              <img
                className="p-8 rounded-t-lg "
                src={product.thumbnail}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <a href={`http://localhost:3000/products/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                  {product.title}
                </h5>
              </a>
              <span className="text-2md  font-bold text-gray-900 dark:text-white">
                Rating: {product.rating}
              </span>
              <div className="flex items-center justify-between ">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <button
                  className={`text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800 ${
                    isAddToCart ? `addCartBtn` : `removeCartBtn`
                  }`}
                  onClick={() => handleClick(product)}
                >
                  {isAddToCart ? "Add to cart" : "Remove"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {shouldRenderPagination && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { API } from "../../utils/axios-instance";
const Product = ({ product, handleClick, isAddToCart }) => {
  const user = useSelector((state) => state.role.user);
  const heartHandle = async (item) => {
    const alreaydLiked = user.favouriteProducts.filter(
      (product) => product.id === item.id
    );

    if (alreaydLiked.length === 0) {
      user.favouriteProducts.push(item);
      try {
        const data = await API.patch(`/users/${user.id}`, user);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <div
        key={product.id}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <button className="justify-items-end h-5 w-6">
          <CiHeart onClick={() => heartHandle(product)} />
        </button>
        <Link to={`/products/${product.id}`}>
          <img
            className="p-8 rounded-t-lg "
            src={product.thumbnail}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/products/${product.id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
              {product.title}
            </h5>
          </Link>
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
          {!isAddToCart ? (
            <div className="flex items-text-center text-3xl">
              <button onClick={() => setQuantity(quantity - 1)}>-</button>{" "}
              {quantity}{" "}
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

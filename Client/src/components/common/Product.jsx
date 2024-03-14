import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  quantityOfProducts,
  removeFromCart,
} from "../../redux/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../utils/axios-instance";
import { setRole } from "../../redux/actions/roleAction";

const Product = ({ product, handleClick, isAddToCart }) => {
  const user = useSelector((state) => state.role.user);
  const [quantity, setquantity] = useState(product.quantity);
  const dispatch = useDispatch();

  const heartHandle = async (item) => {
    const alreaydLiked = user.favouriteProducts.filter(
      (product) => product.id === item.id
    );

    if (alreaydLiked.length === 0) {
      user.favouriteProducts.push(item);
      try {
        const data = await API.patch(`/users/${user.id}`, user);
        dispatch(setRole("user", user));
      } catch (error) {
        console.log(error);
      }
    }
    toast.success("Added to whishlist!", {
      position: "top-right",
    });
  };

  function handleChangedQuantity(product, change) {
    if (change == "dec") {
      setquantity(quantity - 1);
      product.stock += 1;
      dispatch(quantityOfProducts({ id: product.id, quantity: quantity - 1 }));
      toast.info(" Product Quantity Decreased!", {
        position: "top-right",
      });
      if (quantity <= 1) {
        product.stock = product.stock + product.quantity;
        dispatch(removeFromCart(product.id));
        toast.success("Removed from the cart!", {
          position: "top-right",
        });
      }
    } else {
      setquantity(quantity + 1);
      product.stock -= 1;
      product.stock &&
        dispatch(
          quantityOfProducts({ id: product.id, quantity: quantity + 1 })
        );
      toast.info(" Product Quantity Increased!", {
        position: "top-right",
      });
    }
  }

  return (
    <div>
      <div
        key={product.id}
        className="w-full max-h-[25rem] max-w-sm bg-white border border-gray-200 rounded-lg shadow"
      >
        <button className="justify-items-end h-5 w-6">
          <CiHeart onClick={() => heartHandle(product)} />
        </button>
        <div className="h-[50%!important] overflow-hidden">
          <Link to={`/products/${product.id}`}>
            <img
              className="w-full h-full object-fit"
              src={product.thumbnail}
              alt="product image"
            />
          </Link>
        </div>
        <div className="px-5 pb-5 h-[50%!important]">
          <Link to={`/products/${product.id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
          </Link>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Rating: {product.rating}
          </span>
          <div className="flex items-center justify-between ">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <button
              className={`text-white bg-[#0295db] hover:bg-[#9d9da1]  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800 ${
                isAddToCart ? `addCartBtn` : `removeCartBtn`
              }`}
              onClick={() => handleClick(product)}
            >
              {isAddToCart ? "Add to cart" : "Remove"}
            </button>
          </div>
          {!isAddToCart ? (
            <>
              <div className="flex justify-center text-3xl">
                <button onClick={() => handleChangedQuantity(product, "dec")}>
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={quantity}
                  readOnly
                  className="text-center m-2"
                />
                <button onClick={() => handleChangedQuantity(product, "inc")}>
                  +
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Grand Total:- ${quantity * product.price}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

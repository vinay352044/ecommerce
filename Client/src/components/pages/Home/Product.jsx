import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  quantityOfProducts,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../utils/axios-instance";
import { setRole } from "../../../redux/actions/roleAction";
import Card from "../../common/Card";

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
      toast.success("Added to whishlist!", {
        position: "top-right",
      });
    } else {
      toast.success("Already in whishlist!", {
        position: "top-right",
      });
    }
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
      if (product.stock > 0) {
        setquantity(quantity + 1);
        product.stock -= 1;
        dispatch(
          quantityOfProducts({ id: product.id, quantity: quantity + 1 })
        );
        toast.info(" Product Quantity Increased!", {
          position: "top-right",
        });
      } else {
        toast.error("No Stocks Available!");
      }
    }
  }

  return (
    <>
      <Card
        product={product}
        heartHandle={heartHandle}
        identifier={"usersCard"}
      >
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
          null
        )}
      </Card>
    </>
  );
};

export default Product;

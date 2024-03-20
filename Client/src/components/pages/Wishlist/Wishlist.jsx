import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../utils/axios-instance";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../../redux/actions/roleAction";
import Card from "../../common/Card";

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.role.user);

  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    try {
      const updatedProducts = user.favouriteProducts.filter(
        (product) => product.id != productId
      );
      // setFavouriteProducts(updatedProducts)
      const updatedUser = { ...user, favouriteProducts: updatedProducts };
      await API.patch(`/users/${user.id}`, updatedUser);
      dispatch(setRole("user", updatedUser));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {user.favouriteProducts.length > 0 ? (
          user.favouriteProducts.map((product, index) => (
            <Card key= {product.id} product={product} identifier='wishlist'>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemove(product.id)}
              >
                Remove
              </button>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen ml-8">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-700 mb-4">
                Add items that you like to your wishlist. <br /> Review them
                anytime and easily move them to the bag.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

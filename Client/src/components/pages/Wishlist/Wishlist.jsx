import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../utils/axios-instance";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../../redux/actions/roleAction";
import Card from "../../common/Card";
import ButtonComponent from "../../common/ButtonComponent";

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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center p-6">
        {user.favouriteProducts.length > 0 ? (
          user.favouriteProducts.map((product, index) => (
            <div className=" items-center lg:mx-auto mr-3  md:mr-0 mt-5 ">
            <Card key= {product.id} product={product} identifier='wishlist'>
              <div className="place-content-center">
              <ButtonComponent 
                onClick={() => handleRemove(product.id)} 
              >
                Remove
              </ButtonComponent>
              </div>
              
            </Card>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-screen ml-8">
            <div className="p-6 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-700 mb-4">
                Add items that you like to your wishlist. <br /> Review them
                anytime and easily move them to the bag.
              </p>
              <ButtonComponent                
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </ButtonComponent>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products";
import { getOrders, registerOrder } from "../../../utils/axios-instance";
import { toast } from "react-toastify";
import { clearCart } from "./../../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const UsersCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const user = useSelector((state) => state.role.user);

  const [orders, setOrders] = useState([]);

  const handleCheckout = async () => {
    let orderId =
      orders.length !== 0
        ? (parseInt(orders[orders.length - 1].id) + 1).toString()
        : "1";

    let gloableSuccess;

    for (let i = 0; i < cartItems.length; i++) {
      const newOrderObj = {
        id: orderId,
        user_id: user.id,
        product_id: cartItems[i].id,
        ordered_at: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        expected_delivery: "",
        order_accepted: "pending",
        accepted_by: "",
        quantity: cartItems[i].quantity,
        product: cartItems[i],
      };
      const { success, data, error } = await registerOrder(newOrderObj);
      gloableSuccess = success;

      orderId = (parseInt(orderId) + 1).toString();

      if (error) {
        toast.error("Something went wronge. Try again later!");
        return;
      }
    }

    if (gloableSuccess) {
      dispatch(clearCart());
      toast.success("Orders placed successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      const { success, data, error } = await getOrders();

      if (error) {
        toast.error("Something went wronge. Try again later!");
      }

      setOrders(data);
    })();
  }, []);

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Products productData={cartItems} isAddToCart={false} />
          <button
            className="text-white bg-[#0295db] hover:bg-[#9d9da1]  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800 mt-4"
            onClick={handleCheckout}
          >
            checkout
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold">
            No Product Available!
          </h1>
        </div>
      )}
    </div>
  );
};

export default UsersCart;

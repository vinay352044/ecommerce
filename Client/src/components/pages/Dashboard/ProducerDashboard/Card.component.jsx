import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { worker } from "../../../../redux/actions/orderActions";
import { toast } from "react-toastify";

function Card({ card_data, hideButtons }) {
  const sellerState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const { cardData, order, sellerid, handleflag } = card_data;
  const [productdetails, setProductdetails] = useState(cardData);
  const [orderData, setorderData] = useState(order);
  const [selectedDate, setSelectedDate] = useState("");
  const [editable, seteditable] = useState(false);
  const [deliveryDateFilled, setDeliveryDateFilled] = useState(false);

  useEffect(() => {
    setProductdetails(cardData);
    setorderData(order);
  }, [cardData, order]);

  function handleAccept(string) {
    if (
      (orderData &&
        orderData.order_accepted === "pending" &&
        deliveryDateFilled) ||
      string === "handlesubmit"
    ) {
      const temporder = {
        ...orderData,
        order_accepted: "accepted",
        accepted_by: `${sellerid}`,
        expected_delivery: `${selectedDate}`,
      };

      setorderData(temporder);

      dispatch(
        worker(
          "UPDATE_ORDER",
          "UPDATE_ACCEPT_ORDER",
          `http://localhost:3000/orders/${temporder.id}`,
          temporder
        )
      );
      toast.success("order accepted");
    } else {
      toast.error("add delivery date");
    }

    handleflag();
  }

  function handleDelay() {
    seteditable(true);
  }

  function handleSubmit() {
    if (deliveryDateFilled) {
      handleAccept("handlesubmit");
      seteditable(false);
    } else {
      toast.error("add delivery date");
    }
  }

  function handleReject() {
    if (orderData && orderData.order_accepted === "pending") {
      const temporder = {
        ...orderData,
        order_accepted: "rejected",
        accepted_by: "",
      };
      setorderData(temporder);
      dispatch(
        worker(
          "UPDATE_ORDER",
          "UPDATE_REJECT_ORDER",
          `http://localhost:3000/orders/${temporder.id}`,
          temporder
        )
      );
      toast.error("order rejected");
    }

    handleflag();
  }

  return (
    <>
      {productdetails ? (
        <div className="w-full md:max-w-xs lg:max-w-sm xl:max-w-md bg-white border border-gray-200 rounded-lg shadow-lg ">
          <div>
            <img
              className="p-8 rounded-t-lg"
              src={productdetails.thumbnail}
              alt="product image"
            />
          </div>
          <div className=" px-2 pb-2 md:px-5 md:pb-5">
            <div>
              <h4 className="text-sm text-center font-semibold md:text-lg tracking-tight text-gray-900 mb-4">
                {productdetails.title}
              </h4>
            </div>
            <div className="md:text-left text-center">
              <h5 className=" text-xs md:text-sm font-normal tracking-tight text-gray-900 mb-4">
                {productdetails.description}
              </h5>
            </div>

            <div className="flex flex-col md:flex-row  items-center justify-between mb-4 ">
              <span className="text-xs md:text-sm font-normal text-gray-900">
                <strong>Discount :</strong> {productdetails.discountPercentage}%
              </span>
              <span className="text-xs md:text-sm font-normal text-gray-900">
                <strong>Rating :</strong> {productdetails.rating}
              </span>
              <span className="text-xs md:text-sm font-normal text-gray-900">
                <strong>Quantity :</strong> {orderData.quantity}
              </span>
            </div>

            {hideButtons ? (
              editable ? (
                <div className="flex flex-col items-center justify-between text-black mb-4">
                  <label
                    className="text-black text:xs md:text-base "
                    htmlFor="delivery_calender"
                  >
                    Delivery Date :
                  </label>
                  <input
                    name="delivery_calender"
                    id="delivery_calender"
                    type="date"
                    placeholder="select date to deliver"
                    autoFocus={editable}
                    onChange={(e) => {
                      const formattedDate = e.target.value;
                      formattedDate.split("-").reverse().join("-");
                      setSelectedDate(formattedDate);
                      setDeliveryDateFilled(true);
                    }}
                    className={`bg-gray-200 px-3 py-1   rounded-md w-full text-center tracking-tight text:xs md:text-base ${
                      editable ? "cursor-text" : "cursor-not-allowed"
                    }`}
                    required
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-between text-black mb-4">
                  <label
                    className="text-black text:xs md:text-base "
                    htmlFor="delivery_calender"
                  >
                    Delivery Date :
                  </label>
                  <input
                    name="delivery_calender"
                    id="delivery_calender"
                    type="text"
                    placeholder="select date to deliver"
                    value={orderData.expected_delivery
                      .split("-")
                      .reverse()
                      .join("-")}
                    readOnly={!editable}
                    autoFocus={editable}
                    className={`bg-gray-200 px-3 py-1   rounded-md w-full text-center tracking-tight text:xs md:text-base ${
                      editable ? "cursor-text" : "cursor-not-allowed"
                    }`}
                  />
                </div>
              )
            ) : (
              //for pending orders
              <div className="flex flex-col items-center justify-between text-black mb-4 ">
                <label
                  className="text-black text:xs md:text-base "
                  htmlFor="delivery_calender"
                >
                  delivery date :
                </label>
                <input
                  name="delivery_calender"
                  type="date"
                  placeholder="select date to deliver"
                  className="border-2 border-gray-200 rounded-md w-full text-center tracking-tight text:xs md:text-base"
                  onChange={(e) => {
                    const formattedDate = e.target.value;
                    formattedDate.split("-").reverse().join("-");
                    setSelectedDate(formattedDate);
                    setDeliveryDateFilled(true);
                  }}
                  required
                />
              </div>
            )}

            <div className="flex flex-row items-center justify-between ">
              <span className="text-sm md:text-xl font-bold text-gray-900 ">
                ${productdetails.price}
              </span>

              <div>
                {hideButtons ? (
                  editable ? (
                    <button
                      onClick={handleSubmit}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    >
                      submit
                    </button>
                  ) : (
                    <button
                      onClick={handleDelay}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    >
                      Delay
                    </button>
                  )
                ) : (
                  <div className="flex flex-row md:flex-row">
                    <button
                      onClick={handleAccept}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    >
                      Accept
                    </button>

                    <button
                      onClick={handleReject}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2 text-center "
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default Card;

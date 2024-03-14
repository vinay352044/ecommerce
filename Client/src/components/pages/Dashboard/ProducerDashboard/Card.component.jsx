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
        <div>
          <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg ">
            <div>
              <img
                className="p-8 rounded-t-lg"
                src={productdetails.thumbnail}
                alt="product image"
              />
            </div>
            <div className="px-5 pb-5">
              <div>
                <h4 className="text-lg  font-semibold tracking-tight text-gray-900  mb-4">
                  {productdetails.title}
                </h4>
              </div>
              <div>
                <h5 className="text-sm  font-normal tracking-tight text-gray-900  mb-4">
                  {productdetails.description}
                </h5>
              </div>
              <div className="flex items-center justify-between mb-4 ">
                <span className="text-sm font-normal text-gray-900">
                  <strong>Discount :</strong>{" "}
                  {productdetails.discountPercentage}%
                </span>
                <span className="text-sm font-normal text-gray-900">
                  <strong>Rating :</strong> {productdetails.rating}
                </span>
                <span className="text-sm font-normal text-gray-900">
                  <strong>Quantity :</strong> {orderData.quantity}
                </span>
              </div>

              {hideButtons ? (
                editable ? (
                  <div className="flex items-center justify-between text-black mb-4">
                    <label className="text-black " htmlFor="delivery_calender">
                      Delivery Date :
                    </label>
                    <input
                      name="delivery_calender"
                      id="delivery_calender"
                      type="date" // Change type to text
                      placeholder="select date to deliver"
                      // value={orderData.expected_delivery} // Set value to fixed date
                      // readOnly={!editable} // Set readOnly attribute to prevent editing
                      autoFocus={editable}
                      onChange={(e) => {
                        const formattedDate = e.target.value;
                        formattedDate.split("-").reverse().join("-");
                        setSelectedDate(formattedDate);
                        setDeliveryDateFilled(true);
                      }}
                      className={`bg-gray-200 px-3 py-1 w-1/2 rounded-md text-center ${
                        editable ? "cursor-text" : "cursor-not-allowed"
                      }`}
                      required
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-black mb-4">
                    <label className="text-black " htmlFor="delivery_calender">
                      Delivery Date :
                    </label>
                    <input
                      name="delivery_calender"
                      id="delivery_calender"
                      type="text" // Change type to text
                      placeholder="select date to deliver"
                      value={orderData.expected_delivery
                        .split("-")
                        .reverse()
                        .join("-")} // Set value to fixed date
                      readOnly={!editable} // Set readOnly attribute to prevent editing
                      autoFocus={editable}
                      className={`bg-gray-200 px-3 py-1 w-1/2 rounded-md text-center ${
                        editable ? "cursor-text" : "cursor-not-allowed"
                      }`}
                    />
                  </div>
                )
              ) : (
                <div className="flex items-center justify-between text-black mb-4 ">
                  <label className="text-black " htmlFor="delivery_calender">
                    delivery date :
                  </label>
                  <input
                    name="delivery_calender"
                    type="date"
                    placeholder="select date to deliver"
                    className="border-2 border-gray-200 rounded-md"
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

              {/* {editable && hide ? (
                <>
                  {hideButtons ? (
                    <div className="flex items-center justify-between text-white mb-4">
                      <label
                        className="text-black "
                        htmlFor="delivery_calender"
                      >
                        Delivery Date:
                      </label>
                      <input
                        name="delivery_calender"
                        id="delivery_calender"
                        type="date" // Change type to text
                        placeholder="select date to deliver"
                        // Set value to fixed date
                        // Set readOnly attribute to prevent editing

                        className={`bg-gray-200 px-3 py-1 w-1/2 rounded-md ${
                          editable ? "cursor-text" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-white mb-4 ">
                      <label
                        className="text-black "
                        htmlFor="delivery_calender"
                      >
                        delivery date
                      </label>
                      <input
                        name="delivery_calender"
                        type="date"
                        placeholder="select date to deliver"
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  
                </>
              )} */}

              <div className="flex items-center justify-between ">
                <span className="text-2xl font-bold text-gray-900 ">
                  ${productdetails.price}
                </span>

                <div>
                  {hideButtons ? (
                    editable ? (
                      <>
                        <button
                          onClick={handleSubmit}
                          className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center "
                        >
                          submit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleDelay}
                          className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center "
                        >
                          Delay
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        onClick={handleAccept}
                        className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center "
                      >
                        Accept
                      </button>

                      <button
                        onClick={handleReject}
                        className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center "
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
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

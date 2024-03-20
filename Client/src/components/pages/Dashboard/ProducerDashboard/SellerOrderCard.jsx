import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { worker } from "../../../../redux/actions/orderActions";
import { toast } from "react-toastify";
import Card from "../../../common/Card";

function SellerOrderCard({ card_data, hideButtons }) {
  const sellerState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  // console.log(currentDate);
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
    if (selectedDate >= currentDate) {
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
        toast.success("Order accepted");
      } else {
        toast.error("Please add a delivery date");
      }
    } else {
      toast.error("Please select a correct date");
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

  const DeliveryLabel = () => (
    <label
      className="text-black text:xs md:text-base "
      htmlFor="delivery_calender"
    >
      Delivery Date :
    </label>
  );

  const DeliveryInput = ({ value, onChange, readOnly }) => {
    return (
      <input
        name="delivery_calender"
        type="date"
        placeholder="select date to deliver"
        value={value}
        autoFocus={editable}
        onChange={onChange}
        readOnly={readOnly}
        className={`bg-gray-200 px-3 py-1 rounded-md w-full text-center tracking-tight text:xs md:text-base ${
          editable ? "cursor-not-allowed" : "cursor-text"
        }`}
        required
      />
    );
  };

  const Button = ({ onClick, text }) => {
    return (
      <button
        onClick={onClick}
        className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2 text-center"
      >
        {text}
      </button>
    );
  };

  //
  // console.log(orderData.product);
  return (
    <>
      {productdetails ? (
        <>
          <Card product={orderData.product} identifier={"ordersCard"}>
            {hideButtons ? (
              editable ? (
                <div className="flex flex-col items-center justify-between text-black mb-4">
                  <DeliveryLabel />
                  <DeliveryInput
                    id="delivery_calender"
                    onChange={(e) => {
                      const formattedDate = e.target.value;

                      formattedDate.split("-").reverse().join("-");
                      setSelectedDate(formattedDate);
                      setDeliveryDateFilled(true);
                    }}
                    readOnly={!editable}
                  />
                  {/* <input
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
                  /> */}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-between text-black mb-4">
                  <DeliveryLabel />
                  <DeliveryInput
                    id="delivery_calender"
                    value={orderData.expected_delivery}
                    readOnly={!editable}
                  />

                  {/* <input
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
                  /> */}
                </div>
              )
            ) : (
              //for pending orders
              <div className="flex flex-col items-center justify-between text-black mb-4 ">
                <DeliveryLabel />
                <DeliveryInput
                  onChange={(e) => {
                    const formattedDate = e.target.value;
                    formattedDate.split("-").reverse().join("-");
                    setSelectedDate(formattedDate);
                    setDeliveryDateFilled(true);
                  }}
                />

                {/* <input
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
                /> */}
              </div>
            )}

            <div className="flex flex-row items-center justify-between ">
              <span className="text-sm md:text-xl font-bold text-gray-900 ">
                ${productdetails.price}
              </span>

              <div>
                {hideButtons ? (
                  editable ? (
                    <Button onClick={handleSubmit} text="submit" />
                  ) : (
                    // <button
                    //   onClick={handleSubmit}
                    //   className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    // >
                    //   submit
                    // </button>
                    <Button onClick={handleDelay} text="Delay" />
                    // <button
                    //   onClick={handleDelay}
                    //   className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    // >
                    //   Delay
                    // </button>
                  )
                ) : (
                  <div className="flex flex-row md:flex-row">
                    <Button onClick={handleAccept} text="Accept" />
                    {/* <button
                      onClick={handleAccept}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2  text-center "
                    >
                      Accept
                    </button> */}
                    <Button onClick={handleReject} text="Reject" />
                    {/* <button
                      onClick={handleReject}
                      className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 mx-1 md:px-5 md:py-2 text-center "
                    >
                      Reject
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default SellerOrderCard;

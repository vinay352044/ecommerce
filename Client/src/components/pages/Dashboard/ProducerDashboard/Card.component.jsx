import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { worker, reject_order } from "../../../../redux/actions/orderActions";

function Card({ card_data, hideButtons }) {
  const sellerState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  console.log("card called");
  console.log(card_data);

  const { cardData, order, sellerid, handleflag } = card_data;
  const [productdetails, setProductdetails] = useState(cardData);
  const [orderData, setorderData] = useState(order);
  const [selectedDate, setSelectedDate] = useState("");
  const [editable, seteditable] = useState(false);

  useEffect(() => {
    setProductdetails(cardData);
    setorderData(order);
  }, [cardData, order]);

  console.log(productdetails);
  console.log(order);
  console.log(sellerid);

  useEffect(() => {
    console.log("order changed");
    console.log(orderData);
    // handleflag();
  }, [orderData]);

  useEffect(() => {
    if (editable) {
      // Focus on the input field when it becomes editable
    }
  }, [editable]);

  function handleAccept(string) {
    console.log("accepted clicked");
    if ((orderData && !orderData.order_accepted)||(string === "handlesubmit")) {
      
      
      const temporder = {
        ...orderData,
        order_accepted: true,
        accepted_by: `${sellerid}`,
        expected_delivery: `${selectedDate}`,
      };
      console.log(temporder);
      setorderData(temporder);

      dispatch(
        worker(
          "ACCEPT_ORDER",
          "UPDATE_ACCEPT_ORDER",
          `http://localhost:3000/orders/${temporder.id}`,
          temporder
        )
      );
    }

   handleflag();
  }

  function handleDelay() {
    seteditable(true);
  }

function handleSubmit(){
  handleAccept("handlesubmit")
  seteditable(false);
}


  function handleReject() {
    const temporder = {
      ...orderData,
      order_accepted: false,
      accepted_by: "",
    };
    setorderData(temporder);

    dispatch(reject_order(temporder.id));
    handleflag();
  }

  console.log("product details in card");
  console.log(productdetails);
  // console.log()
  return (
    <>
      {productdetails ? (
        <div>
          <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg ">
            <a href="#">
              <img
                className="p-8 rounded-t-lg"
                src={productdetails.thumbnail}
                alt="product image"
              />
            </a>
            <div className="px-5 pb-5">
              <div>
                <h5 className="text-base  font-semibold tracking-tight text-gray-900  mb-4">
                  {productdetails.description}
                </h5>
              </div>



              {hideButtons ? (
                    editable ? (
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
                          // value={orderData.expected_delivery} // Set value to fixed date
                          // readOnly={!editable} // Set readOnly attribute to prevent editing
                          autoFocus={editable}
                          onChange={(e) => {const formattedDate = e.target.value;formattedDate.split("-").reverse().join("-");setSelectedDate(formattedDate)}}
                          className={`bg-gray-200 px-3 py-1 w-1/2 rounded-md ${
                            editable ? "cursor-text" : "cursor-not-allowed"
                          }`}
                        />
                      </div>
                    ) : (
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
                          type="text" // Change type to text
                          placeholder="select date to deliver"
                          value={orderData.expected_delivery.split("-").reverse().join("-")} // Set value to fixed date
                          readOnly={!editable} // Set readOnly attribute to prevent editing
                          autoFocus={editable}
                          className={`bg-gray-200 px-3 py-1 w-1/2 rounded-md ${
                            editable ? "cursor-text" : "cursor-not-allowed"
                          }`}
                        />
                      </div>
                    )
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
                        onChange={(e) => {const formattedDate = e.target.value;formattedDate.split("-").reverse().join("-");setSelectedDate(formattedDate)}}
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
                  {hideButtons  ? (editable?(
                     <>
                     <button
                       onClick={handleSubmit}
                       className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center "
                     >
                       submit
                     </button>
                   </>
                  ):
                    <>
                      <button
                        onClick={handleDelay}
                        className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-1 text-center "
                      >
                        Delay
                      </button>
                    </>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card.component";
import { useDispatch, useSelector } from "react-redux";
import { worker, current_orders } from "../../../../redux/actions/orderActions";
function OrdersDashboard() {
  const sellerId = 5132;

  const [totalorders, settotalorders] = useState([]);
  // const [totalproducts,settotalproducts] = useState([])
  const [inventory, setinventory] = useState([]);
  const [availabeleorders, setavailabeleorders] = useState([]);
  const [cardData, setcardData] = useState([]);

  const sellersState = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  const productidArray = sellersState.sellers_details.productsToSell || [];
  useEffect(() => {
    dispatch(
      worker(
        "FETCH",
        "FETCH_SELLERS_DETAILS",
        `http://localhost:3000/sellers/${sellerId}`
      )
    );
    // dispatch(
    //   worker("FETCH", "FETCH_TOTAL_PRODUCTS", "http://localhost:3000/products")
    // );

    dispatch(
      worker("FETCH", "FETCH_TOTAL_ORDERS", "http://localhost:3000/orders")
    );
  }, [dispatch]);

  useEffect(() => {
    console.log("s state");
    console.log(sellersState);
    settotalorders(sellersState.total_orders);
    setavailabeleorders(sellersState.current_orders);
    // setinventory(sellersState.needed_products);
  }, [sellersState]);

  useEffect(() => {
    console.log(productidArray);

    if (
      sellersState.sellers_details.productsToSell !== undefined &&
      sellersState.needed_products.length <
        sellersState.sellers_details.productsToSell.length
    ) {
      // if (sellersState.needed_products.length < sellersState.sellers_details.productsToSell.length) {
      console.log("if worked");

      const apitosend = productidArray.map(
        (id) => `http://localhost:3000/products/${id}`
      );

      // const api = ["http://localhost:3000/products/1",
      // "http://localhost:3000/products/2",
      // "http://localhost:3000/products/3"]
      dispatch(worker("FETCH_MULTI", "FETCH_NEEDED_PRODUCTS", apitosend));
    } else {
      console.log("else worked");
    }

    setinventory(sellersState.needed_products);
  }, [
    sellersState.sellers_details.productsToSell,
    sellersState.needed_products,
  ]);

  useEffect(() => {
    const dummyavailableorders = totalorders.filter((order) => {
      return productidArray.includes(order.product_id);
    });

    dispatch(current_orders(dummyavailableorders));
  }, [totalorders]);

  useEffect(() => {
    console.log(inventory);
    console.log(availabeleorders);
    let dummycardData = [];
    if (availabeleorders.length > 0) {
        dummycardData = availabeleorders.map((order) => {
            return inventory.find(product => product.id === order.product_id);
        });
    }
    setcardData(dummycardData);
    console.log(dummycardData);
}, [availabeleorders, inventory]);

  // console.log(cardData[0])

  const postdata = [
    {
      id: "90",
      title: "practice post",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: "899",
      discountPercentage: "17.94",
      rating: "4.44",
      stock: "34",
      brand: "Apple",
      category: "smartphones",
      total_sell: "15",
      thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      ],
    },
  ];

  // const productReqs =

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Pending Requests
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Accepted Requests
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Rejected Requests
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="contacts-tab"
              data-tabs-target="#contacts"
              type="button"
              role="tab"
              aria-controls="contacts"
              aria-selected="false"
            >
              Feedbacks
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className="  p-4 rounded-lg grid grid-cols-4 gap-y-3  bg-gray-50 dark:bg-gray-800"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          {/* <h1></h1> */}
          {/* //==============================     the pending orders tab  */}

          {availabeleorders &&
          availabeleorders.length &&
          cardData &&
          cardData.length != 0 ? (
            availabeleorders.map((order, index) => (
              <Card key={order.order_id} order_data={cardData[index]} />
            ))
          ) : (
            <h1>No Orders</h1>
          )}

          {/* <Card/>
          <Card/>
          
          <Card/>
          <Card/> */}
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <h1>this is for accepted requests</h1>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <h1>this is for rejected requests</h1>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="contacts"
          role="tabpanel"
          aria-labelledby="contacts-tab"
        >
          <h1>this is for feedbacks</h1>
        </div>
      </div>
    </>
  );
}

export default OrdersDashboard;

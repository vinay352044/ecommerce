import axios from "axios";
import { toast } from "react-toastify";

export function fetch_needed_products(productData) {
  return { type: "FETCH_NEEDED_PRODUCTS", payload: productData };
}

export function fetch_total_orders(data) {
  return { type: "FETCH_TOTAL_ORDERS", payload: data };
}

export function fetch_sellers_details(sellerData) {
  return { type: "FETCH_SELLERS_DETAILS", payload: sellerData };
}

export function set_sellers_inventory(inventoryData) {
  return { type: "SET_SELLERS_INVENTORY", payload: inventoryData };
}

export function current_orders(currentOrdersData) {
  return { type: "CURRENT_ORDERS", payload: currentOrdersData };
}

export function update_accept_order(orderId) {
  return { type: "UPDATE_ACCEPT_ORDER", payload: orderId };
}

export function update_reject_order(orderId) {
  return { type: "UPDATE_REJECT_ORDER", payload: orderId };
}

export function worker(taskName, action_name, api, data) {
  let task;
  if (taskName === "FETCH") {
    task = () =>
      axios
        .get(api)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {toast.error(err)});
  } else if (taskName === "FETCH_MULTI") {
    task = () =>
      Promise.all(api.map((link) => axios.get(link)))
        .then((responses) => {
          const data = responses.map((response) => response.data);
          return data;
        })
        .catch((error) => {
          throw error; // Re-throw the error to propagate it further
        });
  } else if (taskName === "UPDATE_ORDER") {
    task = () => {
      return axios
        .patch(api, data)
        .then((res) => {
          const orderId = parseInt(res.data.id, 10);
          return orderId;
        })
        .catch((err) => console.error("Error updating order:", err.message));
    };
  }

  return async function actionMaker(dispatch) {
    try {
      const result = await task();
      switch (action_name) {
        case "FETCH_NEEDED_PRODUCTS":
          dispatch(fetch_needed_products(result));
          break;

        case "FETCH_TOTAL_ORDERS":
          dispatch(fetch_total_orders(result));
          break;

        case "FETCH_SELLERS_DETAILS":
          dispatch(fetch_sellers_details(result));
          break;

        case "UPDATE_ACCEPT_ORDER":
          dispatch(update_accept_order(result));
          break;
        case "UPDATE_REJECT_ORDER":
          dispatch();
          break;

        default:
          return;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
}

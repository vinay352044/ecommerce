import axios from "axios";

export function fetch_needed_products(productdata) {
  return { type: "FETCH_NEEDED_PRODUCTS", payload: productdata };
}

export function fetch_total_orders(data) {
  return { type: "FETCH_TOTAL_ORDERS", payload: data };
}

export function fetch_sellers_details(sellerdata) {
  return { type: "FETCH_SELLERS_DETAILS", payload: sellerdata };
}

export function set_sellers_inventory(inventoryData) {
  return { type: "SET_SELLERS_INVENTORY", payload: inventoryData };
}

export function current_orders(currentordersdata) {
  return { type: "CURRENT_ORDERS", payload: currentordersdata };
}

export function update_accept_order(orderid) {
  return { type: "UPDATE_ACCEPT_ORDER", payload: orderid };
}

export function update_reject_order(orderid) {
  return { type: "UPDATE_REJECT_ORDER", payload: orderid };
}

export function worker(task_name, action_name, api, data) {
  let task;
  if (task_name === "FETCH") {
    task = () =>
      axios
        .get(api)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {});
  } else if (task_name === "FETCH_MULTI") {
    task = () =>
      Promise.all(api.map((link) => axios.get(link)))
        .then((responses) => {
          const data = responses.map((response) => response.data);

          return data;
        })
        .catch((error) => {
          throw error; // Re-throw the error to propagate it further
        });
  } else if (task_name === "UPDATE_ORDER") {
    // const orderid =4;
    //     task = () =>{return orderid}

    task = () => {
      return axios
        .patch(api, data)
        .then((res) => {
          const orderid = parseInt(res.data.id, 10);

          return orderid;
        })
        .catch((err) => console.error("Error updating order:", err.message));
    };
  }

  return async function action_maker(dispatch) {
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
      console.log(err.message);
    }
  };
}
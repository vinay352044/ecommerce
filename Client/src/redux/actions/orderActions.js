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

export function worker(task_name, action_name, api) {
  let task;
  if (task_name === "FETCH") {
    task = () =>
      axios
        .get(api)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
  }
  else if (task_name === "FETCH_MULTI") {
    task = () =>
      Promise.all(api.map(link => axios.get(link)))
        .then(responses => {
          const data = responses.map(response => response.data);
          console.log(data);
          return data;
        })
        .catch(error => {
          console.error(error.message);
          throw error; // Re-throw the error to propagate it further
        });
  }
  


  return async function action_maker(dispatch) {
    try {
      const data = await task();

      switch (action_name) {
        case "FETCH_NEEDED_PRODUCTS":
          dispatch(fetch_needed_products(data));
          break;


        case "FETCH_TOTAL_ORDERS":
          dispatch(fetch_total_orders(data));
          break;

        case "FETCH_SELLERS_DETAILS":
          dispatch(fetch_sellers_details(data));
          break;

        // case "FETCH_SELLERS_INVENTORY":
        //   dispatch(fetch_sellers_inventory(data));
        //   break;

        default:
          return;
        // case "FETCH_TOTAL_ORDERS " :
        // dispatch(fetch_total_orders(data))
      }
    } catch (err) {
      console.log(err.message);
    }
  };
}

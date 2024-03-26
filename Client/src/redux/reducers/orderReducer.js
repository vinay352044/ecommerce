const intitalstate = {
  needed_products: [],
  total_orders: [],
  sellers_details: {},
  // inventory : [],
  current_orders: [],
  accptedorders: [],
};

export function orderReducer(state = intitalstate, action) {
  switch (action.type) {
    case "FETCH_NEEDED_PRODUCTS":
      return { ...state, needed_products: action.payload };
    case "FETCH_TOTAL_ORDERS":
      return { ...state, total_orders: action.payload };
    case "FETCH_SELLERS_DETAILS":
      return { ...state, sellers_details: action.payload };
    case "SET_SELLERS_INVENTORY":
      return { ...state, inventory: action.payload };
    case "CURRENT_ORDERS":
      return { ...state, current_orders: action.payload };
    case "UPDATE_REJECT_ORDER": {
      const order_id = parseInt(action.payload, 10);
      const currentorder_Array = [...state.current_orders];
      const Index = currentorder_Array.findIndex((order) => {
        const id = parseInt(order.id, 10);

        return id === order_id;
      });
      currentorder_Array.splice(Index, 1);
      const new_State = {
        ...state,
        current_orders: currentorder_Array,
      };
      return new_State;
    }

    case "UPDATE_ACCEPT_ORDER": {
      const orderid = action.payload;
      const currentorderArray = [...state.current_orders];
      const index = currentorderArray.findIndex((order) => {
        const id = parseInt(order.id, 10);
        return id === orderid;
      });
      const accptedorder = currentorderArray[index];
      currentorderArray.splice(index, 1);
      const newState = {
        ...state,
        current_orders: currentorderArray,
        accptedorders: [...state.accptedorders, accptedorder],
      };
      console.log(newState);
      return newState;
    }
    default:
      return state;
  }
}

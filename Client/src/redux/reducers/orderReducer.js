const initialState = {
  neededProducts: [],
  totalOrders: [],
  sellersDetails: {},
  currentOrders: [],
  acceptedOrders: [],
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_NEEDED_PRODUCTS":
      return { ...state, neededProducts: action.payload };
    case "FETCH_TOTAL_ORDERS":
      return { ...state, totalOrders: action.payload };
    case "FETCH_SELLERS_DETAILS":
      return { ...state, sellersDetails: action.payload };
    case "CURRENT_ORDERS":
      return { ...state, currentOrders: action.payload };
    case "UPDATE_REJECT_ORDER": {
      const orderId = parseInt(action.payload, 10);
      const currentOrderArray = [...state.currentOrders];
      const Index = currentOrderArray.findIndex((order) => {
        const id = parseInt(order.id, 10);
        return id === orderId;
      });
      currentOrderArray.splice(Index, 1);
      const new_State = {
        ...state,
        current_orders: currentOrderArray,
      };
      return new_State;
    }

    case "UPDATE_ACCEPT_ORDER": {
      const orderId = action.payload;
      const currentOrderArray = [...state.currentOrders];
      const index = currentOrderArray.findIndex((order) => {
        const id = parseInt(order.id, 10);
        return id === orderId;
      });
      const acceptedOrder = currentOrderArray[index];

      currentOrderArray.splice(index, 1);
      const newState = {
        ...state,
        current_orders: currentOrderArray,
        acceptedOrders: [...state.acceptedOrders, acceptedOrder],
      };
      return newState;
    }
    default:
      return state;
  }
}

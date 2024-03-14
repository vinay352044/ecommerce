import {
  ADD_TO_CART,
  QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/productActions";
const localStore = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: localStore,
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartItems = [...state.cartItems, action.payload];
      const uniqueArray = [...new Set(updatedCartItems)];
      const localArr =  uniqueArray ;
      localStorage.setItem("cartItems", JSON.stringify(localArr));
      return { ...state, cartItems: uniqueArray };

    case REMOVE_FROM_CART:
      const filteredArr = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const newLocalArr = filteredArr
      localStorage.setItem("cartItems", JSON.stringify(newLocalArr));
      return {
        ...state,
        cartItems: filteredArr,
      };

    case QUANTITY:

      
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: action.payload.quantity,
        };
        const updatedArr = updatedItems ;
        localStorage.setItem('cartItems',JSON.stringify(updatedArr))
        return { ...state, cartItems: updatedItems };
      }
      return state;
    default:
      return state;
  }
};

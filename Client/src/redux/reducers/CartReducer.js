import { CLEAR_CART } from "../actions/cartActions";
import {
  ADD_TO_CART,
  QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/productActions";

const user = JSON.parse(localStorage.getItem('role')) || {};
const userId = user.user.id ||user.seller.id ;

const localStoreData = JSON.parse(localStorage.getItem("AllcartItems")) || {};

const initialState = {
  cartItems: localStoreData[userId]?.cartItems || []
};

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartItems = [...state.cartItems, action.payload];
      const uniqueArray = [...new Set(updatedCartItems)];
      const localArr = { ...localStoreData };
      localArr[userId] = { cartItems: uniqueArray };
      localStorage.setItem("AllcartItems", JSON.stringify(localArr));
      return { ...state, cartItems: uniqueArray };

    case REMOVE_FROM_CART:
      const filteredArr = state.cartItems.filter(item => item.id !== action.payload);
      const newLocalArr = { ...localStoreData };
      newLocalArr[userId] = { cartItems: filteredArr };
      localStorage.setItem("AllcartItems", JSON.stringify(newLocalArr));
      return {
        ...state,
        cartItems: filteredArr,
      };

    case QUANTITY:
      const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: action.payload.quantity,
        };
        const updatedArr = { ...localStoreData };
        updatedArr[userId] = { cartItems: updatedItems };
        localStorage.setItem('AllcartItems', JSON.stringify(updatedArr))
        return { ...state, cartItems: updatedItems };
      }
      return state;

    case CLEAR_CART: {
      const newLocalArr = { ...localStoreData };
      delete newLocalArr[userId];
      localStorage.setItem('AllcartItems', JSON.stringify(newLocalArr));
      return {
        ...state, cartItems: []
      }
    }
    default:
      return state;
  }
};
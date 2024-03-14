 import { ADD_TO_CART, QUANTITY, REMOVE_FROM_CART } from "../actions/productActions";

const initialState = {
    cartItems:[]
  
}

export const CartReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            
            const updatedCartItems = [...state.cartItems, action.payload];
            const uniqueArray = [...new Set(updatedCartItems)]; 

            return { ...state, cartItems: uniqueArray }; 
        case REMOVE_FROM_CART:
            
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };

         case QUANTITY:
            const index = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
               
                const updatedItems = [...state.cartItems];
                updatedItems[index] = { ...updatedItems[index], quantity: action.payload.quantity };
                return { ...state, cartItems: updatedItems };
            }
            return state; 
        default:
            return state;
    }
};
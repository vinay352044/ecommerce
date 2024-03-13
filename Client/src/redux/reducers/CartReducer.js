import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/productActions";


const initialState = {
    cartItems:[]
}

export const CartReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_TO_CART:
            const arrayState = state.cartItems;
            return( {
              cartItems: [...arrayState, action.payload]
            })
        
        case REMOVE_FROM_CART:
            const arrayData  = state.cartItems;
            const updatedArray = arrayData.filter((item)=> item.id !==action.payload)
            return({
                cartItems:updatedArray
            })
        default:
           return state;
    }
}
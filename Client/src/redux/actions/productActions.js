import axios from "axios"
import { setLoader } from "./appActions"
import { API } from "../../utils/axios-instance"

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const fetchProductsSuccess = (products) => {
  return{
    type: FETCH_PRODUCTS,
    payload: products
  }
}

//////  fetching product data using redux-thunk
export const fetchProductData = () =>{
  return async (dispatch) =>{
     try{
      dispatch(setLoader(true))
      const response = await API.get("/products");
      
      console.log(response.data);
      dispatch(fetchProductsSuccess(response.data))
      dispatch(setLoader(false))
     }catch(error){
        console.log("Error Occured while fetching data:",error);
     }
    
  }
}


////  Add to cart action creator
export const addToCart = (product) => {
    return({
      type:ADD_TO_CART,
      payload:product
    })
}

export const removeFromCart = (id) =>{
  return({
    type:REMOVE_FROM_CART,
    payload:id
  })
}
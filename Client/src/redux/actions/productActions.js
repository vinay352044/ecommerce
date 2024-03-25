import axios from "axios"
import { setLoader } from "./appActions"
import { getProducts } from "../../utils/axios-instance"
import 'react-toastify/dist/ReactToastify.css';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const QUANTITY = 'QUANTITY'

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
      const response = await getProducts();
      dispatch(fetchProductsSuccess(response.data))
      dispatch(setLoader(false))
     }catch(error){
        console.log("Error Occurred while fetching data:",error);
     }
    
  }
}



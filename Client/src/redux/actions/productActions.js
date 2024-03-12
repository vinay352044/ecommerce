import axios from "axios"
import { setLoader } from "./appActions"
import { API } from "../../utils/axios-instance"

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

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
      dispatch(fetchProductsSuccess(response.data))
      dispatch(setLoader(false))
     }catch(error){
        console.log("Error Occured while fetching data:",error);
     }
    
  }
}

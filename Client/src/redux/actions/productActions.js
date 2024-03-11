export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export const fetchProductsSuccess = (products) => {
  return{
    type: FETCH_PRODUCTS,
    payload: products
  }
}

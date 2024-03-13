
const intitalstate = {
    needed_products:[],
  total_orders : [],
  sellers_details : {},
  // inventory : [],  
  current_orders : []

}



export function orderReducer (state=intitalstate,action) {
    

switch (action.type){
  case "FETCH_NEEDED_PRODUCTS" : 
  return  {...state, needed_products : action.payload };
// if(state.sellers_details.productsToSell !== undefined && state.needed_products.length < state.sellers_details.productsToSell ){
//   console.log("this block worked")
//  return  {...state, needed_products : [...state.needed_products,action.payload] };
//  }
//  else{console.log("else worked") ;return state; } 

case "FETCH_TOTAL_ORDERS" : return {...state, total_orders : action.payload };

case "FETCH_SELLERS_DETAILS" : return {...state, sellers_details : action.payload };
case "SET_SELLERS_INVENTORY" : return {...state, inventory : action.payload };
case "CURRENT_ORDERS" : return {...state, current_orders : action.payload };
default : return state;

}

}
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

import Products from './Products';

const UsersCart = () => {
    

    const cartItems = useSelector((state)=>state.CartReducer.cartItems)
    // const cartItems =  JSON.parse(localStorage.getItem("cartItems")) || [];
//  useEffect(() => {
  
//  }, [cartItems])
 
    
    
    

  return (
    <div>
       <Products productData={cartItems} isAddToCart={false}/>
       <button className='text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800'>Checkout</button>
    </div>
  )
}

export default UsersCart

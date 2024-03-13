import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './Products';

const UsersCart = () => {
    

    const cartItems = useSelector((state)=>state.CartReducer.cartItems)
    console.log(cartItems);

  return (
    <div>
       <ProductCard productData={cartItems} isAddToCart={false}/>
       
       
    </div>
  )
}

export default UsersCart

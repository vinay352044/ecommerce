import React from 'react'
import { useEffect,useState } from 'react'
import { API } from '../../../utils/axios-instance'
import { useSelector } from 'react-redux'
const Wishlist = () => {
  const data = useSelector((state) => state.role.user)
  console.log(data)
  const [favouriteProducts,setFavouriteProducts] = useState([])
  const fun = async() => {
    try{
    const response = await API.get(`/users/${data.id}`)
    const output = response.data
    setFavouriteProducts(output.favouriteProducts)
    console.log(output)
    }
    catch(error){
      console.log(error)
    }
  }
useEffect(()=>{
fun()
},[data])
  return (
    <div>
    <h2>Wishlist</h2>
    <div className='grid grid-cols-3 gap-4'>
      {favouriteProducts.length > 0 ? (
        <div>
          {favouriteProducts.map((product, index) => (
            <div key={index} className="border rounded p-4">
            <h3 className="font-bold text-xl">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500 font-semibold">Price: ${product.price}</p>
          </div>
          ))}
        </div>
      ) : (
        <p>No favorite products found.</p>
      )}
    </div>
  </div>
  )
}

export default Wishlist

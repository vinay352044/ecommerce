import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../../../utils/axios-instance';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const data = useSelector((state) => state.role.user);
  console.log(data.favouriteProducts)
  const existing = data.favouriteProducts
  console.log(existing[0].id)
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      try {
        const response = await API.get(`/users/${data.id}`);
        const output = response.data;
        setFavouriteProducts(output.favouriteProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteProducts();
  }, [data]);

  const heartHandle = async (item) => {
    const alreadyLiked = data.favouriteProducts.find(
      (product) => product.id === item.id
    );

    if (!alreadyLiked) {
      data.favouriteProducts.push(item);

      try {
        const updatedUser = await API.patch(`/users/${data.id}`, data);
        console.log(updatedUser);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRemove= async(productId) => {
    try{
    const updatedProducts = favouriteProducts.filter(product => product.id != productId)
    setFavouriteProducts(updatedProducts)
    const updatedUser = {...data,favouriteProducts:updatedProducts}
    await API.patch(`/users/${data.id}`,updatedUser)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Wishlist</h2>
      <div className='grid grid-cols-3 gap-4'>
        {favouriteProducts.length > 0 ? (
          favouriteProducts.map((product, index) => (
            <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              <Link to={`/products/${product.id}`}>
                <img
                  className="p-8 rounded-t-lg"
                  src={product.thumbnail}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link to={`/products/${product.id}`}>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                    {product.title}
                  </h5>
                </Link>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-blue-500 font-semibold">Price: ${product.price}</p>
                <button onClick={()=> handleRemove(product.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite products found.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

import React from "react";

import { CiHeart } from "react-icons/ci";

const ProductCard = ({ productData }) => {


    function favourite(){
        console.log('clicked');
    }
  return (
    <>
      <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
        {productData.map((product) => {
          return (
            <>
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <button className="justify-items-end h-5 w-6">
                  <CiHeart onClick={favourite}/>
                </button>
                <a href={`http://localhost:3000/products/${product.id}`}>
                  <img
                    className="p-8 rounded-t-lg "
                    src={product.thumbnail}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href={`http://localhost:3000/products/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                      {product.title}
                    </h5>
                  </a>
                  <span className="text-2md  font-bold text-gray-900 dark:text-white">
                    Rating: {product.rating}
                  </span>
                  <div className="flex items-center justify-between ">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <button className="text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductCard;

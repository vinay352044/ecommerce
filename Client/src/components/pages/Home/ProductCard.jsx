import React from "react";
import Pagination from "../../common/Pagination";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";
const ProductCard = ({ productData }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6); 
    function favourite(){
        console.log('clicked');
    }
    const indexOfLastRecord = currentPage * recordsPerPage;   // for ex : 1*2=2
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;   // for ex = 2-2=0
    const currentProducts = productData.slice(indexOfFirstRecord, indexOfLastRecord);  // slice is exclusive of last record, returns a shallow copy,original array would not be modified
    const nPages = Math.ceil(productData.length / recordsPerPage);
  return (
    <>
      <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
        {currentProducts.map((product) => {
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
        <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}  
            />
      </div>
    </>
  );
};

export default ProductCard;

import React from "react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import Pagination from "../../common/Pagination";
import useDebounceHook from "../../common/useDebounceHook";
import { addToCart, removeFromCart } from "../../../redux/actions/productActions";
const user = [{
  "userId": "1",
			"name": "Aarav",
			"email": "aarav@example.com",
			"password": "aaravpass",
			"favouriteProducts": []
}]
const ProductCard = ({ productData,isAddToCart }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6); 
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounceHook(searchQuery, 500);
    const filteredProducts = productData.filter(product =>
      product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

    function favourite(){
        console.log('clicked');
    }
    const indexOfLastRecord = currentPage * recordsPerPage;   
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;   
    const currentProducts = filteredProducts.slice(indexOfFirstRecord, indexOfLastRecord);  
    const nPages = Math.ceil(productData.length / recordsPerPage);

    function handleClick(product){
        if(isAddToCart){
            dispatch(addToCart(product))
        }else{
            dispatch(removeFromCart(product.id))
        }
        
    }
    const handleSearchChange = e =>{
      setSearchQuery(e.target.value)
      setCurrentPage(1)
    }
    const shouldRenderPagi = filteredProducts.length > recordsPerPage
  return (
    <>
    <input
                type="text"
                placeholder="Search..."
                className=""
                value={searchQuery}
                onChange={handleSearchChange}
            />
      <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
        
        {currentProducts.map((product,key) => {
            
          return (
            
              <div key={product.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                    <button className={`text-white bg-[#0295db] hover:bg-[#9d9da1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800 ${isAddToCart ? `addCartBtn`: `removeCartBtn`}`} onClick={()=>handleClick(product)}>
                      {isAddToCart ? ('Add to cart') : ('Remove')}
                    </button>
                  </div>
                </div>
              </div>
            
          );
        })}
         {shouldRenderPagi && (
         <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}  
            />
         )}
      </div>
    </>
  );
};

export default ProductCard;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Carousel } from "flowbite-react";
import { Rating, RatingStar } from "flowbite-react";
import { addProductInCart } from "../../../redux/actions/cartActions";
import { API } from "../../../utils/axios-instance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductViewDetais = () => {
 
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('productDetails');
      return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {};
    }
  });
  
  const params = useParams();
  const productId = params.productId;
  

  useEffect(()=>{
    
      const getProductDetails = async () =>{
        const response = await API.get(`/products/${productId}`);
        console.log(response.data);
        setData(response.data)
      }
    getProductDetails();
    localStorage.setItem("productDetails", JSON.stringify(data))
  },[])
  
  const requiredProd = data;
  
  const dispatch = useDispatch(); 
  const auth = JSON.parse(localStorage.getItem('role')) || false;
  const isAuth = auth.isAuth;
  function handleClick(product) {
    if(isAuth){
      dispatch(addProductInCart(product));
    }else{
      toast.warning('Please Login!!')
    }
    
  }

  return (
    <>
      <div className="container my-auto  p-4 mx-auto w-full h-full flex justify-center items-center sm:p-16 md:p-16">
        <div className=" w-full md:w-[50%] h-full border-[1px] border-[#2590db] rounded-md shadow-2xl md:flex-col overflow-hidden">
          <div className="h-60 w-[100%]">
            <Carousel slideInterval={5000}>
              {requiredProd?.images?.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="w-full h-full object-cover"
                    src={image}
                    alt="..."
                  />
                );
              })}
            </Carousel>
          </div>
          <div className="flex flex-col items-center bg-white border border-gray-200 hover:bg-gray-100 ">
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {requiredProd.title}
              </h5>
              <Rating>
                <RatingStar />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {requiredProd.rating}
                </p>
              </Rating>
              <p className="my-2 font-normal text-gray-700 dark:text-gray-400">
                {requiredProd.description}
              </p>
              <p className="font-normal text-green-800 dark:text-gray-400">
                Special Price:
              </p>
              <span className="flex flex-row justify-start items-center gap-4 flex-wrap">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${requiredProd.price}
                </p>
                <p className="text-sky-600/100 ">
                  {requiredProd.discountPercentage} % Off
                </p>
              </span>
              <span className="flex flex-row justify-items-start gap-4 items-center flex-wrap">
                <p className="capitalize text-sm">Brand:</p>
                <p className="text-lg font-bold text-gray-900">
                  {requiredProd.brand}
                </p>
                <p className="capitalize text-base font-bold-300">
                  Category: ({requiredProd.category})
                </p>
              </span>
            </div>
            <div className="">
              <button
                className="text-white bg-[#0295db] hover:bg-[#9d9da1]  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#0295db] dark:hover:bg-[#9d9da1] dark:focus:ring-blue-800 mb-4"
                onClick={() => handleClick(requiredProd)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewDetais;

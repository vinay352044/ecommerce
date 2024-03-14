import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Carousel } from "flowbite-react";
import { Rating, RatingStar } from "flowbite-react";
import { addProductInCart } from "../../../redux/actions/cartActions";

const ProductViewDetais = () => {
  const params = useParams();
  const productId = params.productId;

  const products = useSelector((state) => state.productReducer.products);

  const oneProductDetails = products.filter(
    (item) => item.id == productId.toString()
  );

  const requiredProd = oneProductDetails[0];
  const dispatch = useDispatch();
  function handleClick(product) {
    dispatch(addProductInCart(product));
  }

  return (
    <>
      <div className="container mx-auto w-1/2 z-0 mt-4">
        {
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
            <Carousel slideInterval={5000}>
              {requiredProd.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="bg-cover bg-center object-fill "
                    src={image}
                    alt="..."
                  />
                );
              })}
            </Carousel>
          </div>
        }
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 container mx-auto  w-1/5  mt-6">
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
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {requiredProd.description}
            </p>
            <p className="mb-3 font-normal text-green-800 dark:text-gray-400">
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
              <p className="text-xl font-bold text-gray-900">
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
    </>
  );
};

export default ProductViewDetais;

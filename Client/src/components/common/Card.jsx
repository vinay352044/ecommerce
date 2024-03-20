import React, { useState } from "react";
import { Rating, RatingStar } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function Card({ product, heartHandle, identifier, children }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  let flag;

  (identifier === "usersCard" || identifier === "wishlist") ? (flag = true) : (flag = false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div>
      <div
        key={product.id}
        className="w-full lg:max-w-sm  h-[min(470px,100%)]  bg-white border border-gray-200 rounded-lg shadow "
      >
        {flag ? (
          <button className="flex justify-center items-center  h-10 w-16 md:w-11 lg:w-11 max-h-10 -mb-8 md:-mb-4">
          <CiHeart onClick={() => heartHandle(product)} />
        </button>
        
        ) : null}

        <div className="overflow-hidden">
          <Link
            className={`${flag ? `` : `pointer-events-none`} `}
            to={`/products/${product.id}`}
          >
            <img
              className="p-8 md:p-5 lg:p-5 rounded-t-lg w-96 h-60"
              src={product.thumbnail}
              alt="product image"
            />
          </Link>
        </div>
        <div className="px-5 pb-5 ">
          <Link
            className={`${flag ? `` : `pointer-events-none`} `}
            to={`/products/${product.id}`}
          >
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {product.title}
            </h5>
          </Link>
          <p
            className={` font-normal text-gray-800  ${
              showFullDescription ? "" : "truncate"
            }`}
          >
            {product.description}
          </p>
          {!showFullDescription ? (
            <button className="text-blue-600" onClick={toggleDescription}>
              Read more
            </button>
          ) : (
            <button className="text-gray-500" onClick={toggleDescription}>
              Read less
            </button>
          )}
          <div className="flex flex-row   items-center justify-between  my-4 ">
            <span className="text-sm font-normal text-gray-900 mt-2 md:mt-0">
              <strong>Discount :</strong> {product.discountPercentage}%
            </span>
            <Rating className="mt-2 md:mt-0">
              <RatingStar />
              <p className="ml-2 text-sm font-bold text-gray-900">
                {product.rating}
              </p>
            </Rating>
            {!flag ? (
              <span className="text-sm font-normal text-gray-900 mt-2 md:mt-0">
                <strong>Quantity :</strong> {product.quantity}
              </span>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
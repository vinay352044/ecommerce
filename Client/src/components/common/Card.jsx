import React from "react";
import { Rating, RatingStar } from "flowbite-react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

function Card({ product, heartHandle, identifier, children }) {
  let flag;

  identifier === "usersCard" || identifier === "wishlist"
    ? (flag = true)
    : (flag = false);

  return (
    <div>
      <div
        key={product.id}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
      >
        {flag ? (
          <button className="justify-items-end h-5 w-6">
            <CiHeart onClick={() => heartHandle(product)} />
          </button>
        ) : null}

        <div className="overflow-hidden">
          <Link
            className={`${flag ? `` : `pointer-events-none`} `}
            to={`/products/${product.id}`}
          >
            <img
              className="p-8 rounded-t-lg"
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
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {product.description}
            </p>
          </Link>
          <div className="flex flex-col md:flex-row  items-center justify-between mb-4 ">
            <span className="text-xs md:text-sm font-normal text-gray-900">
              <strong>Discount :</strong> {product.discountPercentage}%
            </span>
            <Rating>
              <RatingStar />
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                {product.rating}
              </p>
            </Rating>
            {!flag ? (
              <span className="text-xs md:text-sm font-normal text-gray-900">
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

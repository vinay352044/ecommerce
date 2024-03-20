import React, { useEffect, useState } from "react";

const Sorting = ({
  handleSortingChange,
  searchResults,
  sortOrder,
  setSortingResult,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(searchResults)) {
      // condition to chech whether the searchResults are not empty
      let tempProducts = [...searchResults];
      if (sortOrder === "ascPrice") {
        tempProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "descPrice") {
        tempProducts.sort((a, b) => b.price - a.price);
      } else if (sortOrder === "ascRating") {
        tempProducts.sort((a, b) => a.rating - b.rating);
      } else if (sortOrder === "descRating") {
        tempProducts.sort((a, b) => b.rating - a.rating);
      }
      setSortingResult(tempProducts);
    }
  }, [searchResults, sortOrder]);

  const handleChange = (order) => {
    handleSortingChange(order);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[10vw]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Sort
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleChange("ascPrice")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                sortOrder === "ascPrice" && "font-semibold"
              }`}
              role="menuitem"
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleChange("descPrice")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                sortOrder === "descPrice" && "font-semibold"
              }`}
              role="menuitem"
            >
              Price: High to Low
            </button>
            <button
              onClick={() => handleChange("ascRating")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                sortOrder === "ascRating" && "font-semibold"
              }`}
              role="menuitem"
            >
              Rating: Low to High
            </button>
            <button
              onClick={() => handleChange("descRating")}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${
                sortOrder === "descRating" && "font-semibold"
              }`}
              role="menuitem"
            >
              Rating: High to Low
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sorting;

import React, { useEffect, useState } from "react";

const Sorting = ({ searchResults, setSortingResult }) => {
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    if (searchResults.length>0) {
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

  const sortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="relative w-[10vw]">
      <select
        onChange={(e) => sortChange(e.target.value)}
      >
        <option value="">Sort</option>
        <option value="ascPrice">Price: Low to High</option>
        <option value="descPrice">Price: High to Low</option>
        <option value="ascRating">Rating: Low to High</option>
        <option value="descRating">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
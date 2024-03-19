import React, { useEffect } from "react";

const Searching = ({ searchQuery, handleSearchChange, productData, setFilteredProducts }) => {
  useEffect(() => {
    console.log("Filtered Query:", searchQuery);
    const filteredProducts = productData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchQuery, productData, setFilteredProducts]);

  return (
    <input
      type="text"
      placeholder="Search..."
      className="px-4 py-2 w-[60vw] border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default Searching;

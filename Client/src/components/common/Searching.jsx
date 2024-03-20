import React, { useEffect } from "react";
import useDebounceHook from '../../utils/custom-hooks/useDebounce'
const Searching = ({ searchQuery, handleSearchChange, productData, setSearchResults }) => {
    const debouncedSearchQuery = useDebounceHook(searchQuery, 500);

  useEffect(() => {
    if(productData.length>0){
    const searchResults = productData.filter(
      (product) =>
       (product.title && product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) ||
        (product.name && product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) 
    );
    setSearchResults(searchResults);
    }
  }, [debouncedSearchQuery, productData, setSearchResults]);

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

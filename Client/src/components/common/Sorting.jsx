import React, { useEffect, useState } from 'react';

const Sorting = ({ handleSortingChange, filteredProducts, sortOrder, setPriceSorting }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        let tempProducts = [...filteredProducts];
        if (sortOrder === "asc") {
            tempProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            tempProducts.sort((a, b) => b.price - a.price);
        }
        setPriceSorting(tempProducts)
    }, [filteredProducts, sortOrder]);

  

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
                            onClick={() => handleChange('asc')}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${sortOrder === 'asc' && 'font-semibold'}`}
                            role="menuitem"
                        >
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => handleChange('desc')}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${sortOrder === 'desc' && 'font-semibold'}`}
                            role="menuitem"
                        >
                            Price: High to Low
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sorting;

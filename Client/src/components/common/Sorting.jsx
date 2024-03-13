import React, { useState } from 'react';

const Sorting = ({ handleSortingChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (order) => {
        handleSortingChange(order);
        setIsOpen(false); 
    };

    return (
        <div className="relative">
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
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                        >
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => handleChange('desc')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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

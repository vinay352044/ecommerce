import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../common/Pagination";
import useDebounceHook from "../../common/useDebounceHook";
import { addToCart, removeFromCart } from "../../../redux/actions/productActions";
import Sorting from "../../common/Sorting"; 
import Product from "../../common/Product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from "../../../utils/axios-instance";

const Products = ({ productData, isAddToCart }) => {
    const user = useSelector((state)=> state.role.user)
    console.log(user)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6); 
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState(null); 
    const dispatch = useDispatch();
    const debouncedSearchQuery = useDebounceHook(searchQuery, 500);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    

    const filteredProducts = productData.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );


    const sortedProducts = [...filteredProducts];
    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    const currentProducts = sortedProducts.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(sortedProducts.length / recordsPerPage);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); 
    };


    const handleSortingChange = order => {
        setSortOrder(order);
    };

    const handleClick = product => {
        if (isAddToCart) {
            dispatch(addToCart(product))
            toast.success("Added to the cart!", {
                position: 'top-right',
              });
        } else {
            dispatch(removeFromCart(product.id))
            toast.success("Removed from the cart!", {
                position: 'top-right',
              });
        }
    };


    const shouldRenderPagination = sortedProducts.length > recordsPerPage;

    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                className="search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <br/>

            <Sorting handleSortingChange={handleSortingChange} />
            <br/>
            <div className="grid gap-4 grid-cols-3 grid-rows-3 auto-rows-auto">
                {currentProducts.map(product => (
                     <Product product={product} handleClick={handleClick} isAddToCart={isAddToCart}/>
                ))}
 
                {shouldRenderPagination && (
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}  
                    />
                )}
            </div>
        </>
    );
};

export default Products;

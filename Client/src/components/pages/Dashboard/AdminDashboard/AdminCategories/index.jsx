import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Table from '../../../../common/Table'
import { DeleteCategoryById, getCategories } from '../../../../../utils/axios-instance'

const AdminCategories = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const handleCreateCategories = () => {
        navigate("/admin-createCategories")
    }

    const handleUpdate = (categoryID) => {
        console.log(categoryID)
        navigate(`/admin-update-category/${categoryID}`)
    }
    const handleProductDelete = async (categoryID) => {
        console.log(categoryID);

        const shouldDelete = window.confirm("Are you sure you want to delete this product?");

        if (!shouldDelete) {
            return;
        }

        try {
            const response = await DeleteCategoryById(categoryID);
            if (response.success) {
                console.log("Product Deleted Successfully!");

                setCategories((prevCategory) => prevCategory.filter(category => category.id !== categoryID));
            } else {
                console.error('Failed to delete the Products Data', response.error);
            }
        } catch (error) {
            console.error('Failed to delete the Products Data', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                if (response.success) {
                    setCategories(response.data);
                    console.log(response)
                } else {
                    console.error('Failed to fetch the Products Data', response.error);
                }
            } catch (error) {
                console.error('Error while Fetching products', error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <>
            <div className="text-center text-2xl font-bold mb-8">Manage Category</div>


            <div className="flex justify-end mb-4">
                <Link to="/admin-createCategories" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-5">+ ADD CATEGORY</Link>
            </div>
            <Table data={categories} handleUpdate={handleUpdate} handleProductDelete={handleProductDelete} type="category" />
        </>
    )

}

export default AdminCategories

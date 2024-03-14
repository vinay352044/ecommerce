import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../../../common/Table'
import { getCategories } from '../../../../../utils/axios-instance'

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
            <div>
                AdminCategories Home Page

            </div>
            <button onClick={handleCreateCategories}>Create Categories</button>
            <Table data={categories} handleUpdate={handleUpdate} type="category" />
        </>
    )

}

export default AdminCategories

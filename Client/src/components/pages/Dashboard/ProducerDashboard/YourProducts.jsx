import React, {useEffect, useState} from 'react'
import {DeleteProductbyId, getProducts} from '../../../../utils/axios-instance';
import {useNavigate} from 'react-router-dom';
import Table from '../../../common/Table';

const YourProducts = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleCreateProduct = () => {
    navigate('/seller-create-products');
  };

  const handleProductUpdate = (productID) => {
    console.log(productID)
    navigate(`/seller-update-products/${productID}`);
  }

  const handleProductDelete = async (productID) => {
    console.log(productID);

    const shouldDelete = window.confirm("Are you sure you want to delete this product?");

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await DeleteProductbyId(productID);
      if (response.success) {
        console.log("Product Deleted Successfully!");

        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productID));
      } else {
        console.error('Failed to delete the Products Data', response.error);
      }
    } catch (error) {
      console.error('Failed to delete the Products Data', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.data);
        console.log(response)
      } else {
        console.error('Failed to fetch the Products Data', response.error);
      }
    } catch (error) {
      console.error('Error while Fetching products', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
            <Table products={products} handleProductUpdate={handleProductUpdate} handleProductDelete={handleProductDelete} />
    </div>
  )
}

export default YourProducts

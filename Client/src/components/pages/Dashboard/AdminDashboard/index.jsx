import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProductbyId, getProducts } from '../../../../utils/axios-instance';
import Searching from '../../../common/Searching';
import Pagination from '../../../common/Pagination';
import Sorting from '../../../common/Sorting';
import { AiOutlineSearch } from 'react-icons/ai'; 
import Table from '../../../common/Table';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortingResult,setSortingResult] = useState([])

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

 
  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleSortingChange = order => {
    setSortOrder(order)
  }

  const shouldRenderPagination = sortingResult.length > recordsPerPage



  const handleUpdate = (productID) => {
    console.log(productID)
    navigate(`/admin-update-products/${productID}`);
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


  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-8 mb-8">Admin Dashboard</h1>
      <div className="flex justify-between mb-4">
        <div className='flex px-20'>
          <div className="relative mr-4">
          <Searching
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          productData={products}
          setFilteredProducts={setFilteredProducts}
        />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <AiOutlineSearch />
            </div>
          </div>
          <Sorting
          handleSortingChange={handleSortingChange}
          sortOrder={sortOrder}
          setSortingResult={setSortingResult}
          filteredProducts={filteredProducts}
        />
        </div>
        <Link to="/admin-create-products" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-20">+ ADD PRODUCT</Link>
      </div>

      <Table data={sortingResult.slice(indexOfFirstRecord, indexOfLastRecord)} type="product" handleUpdate={handleUpdate} handleProductDelete={handleProductDelete} />
      {shouldRenderPagination && (
        <div className="flex justify-center w-screen items-center">
          <Pagination
            nPages={Math.ceil(sortingResult.length / recordsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Index;

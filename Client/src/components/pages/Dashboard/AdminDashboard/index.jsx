import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProductbyId, getProducts } from '../../../../utils/axios-instance';
import useDebounceHook from '../../../../utils/custom-hooks/useDebounce';
import Pagination from '../../../common/Pagination';
import Sorting from '../../../common/Sorting';
import { AiOutlineSearch } from 'react-icons/ai';
import Table from '../../../common/Table';
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal';
import Input from '../../../common/Input';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(6)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productIdToBeDeleted, setProductIdToBeDeleted] = useState(null);

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage


  const productsArray = [
    { key: 'id', label: 'Product ID' },
    { key: 'title', label: 'Title' },
    { key: 'price', label: 'Price' },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' }
  ]
  // console.log(products)
  const debouncedQuery = useDebounceHook(searchQuery, 500)
  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }
  const filteredData = products.filter(product => product.title && product.title.toLowerCase().includes(debouncedQuery.toLowerCase()))
  const sortedData = [...filteredData]
  if (sortOrder === 'asc') {
    sortedData.sort((a, b) => a.price - b.price)
  }
  if (sortOrder === 'desc') {
    sortedData.sort((a, b) => b.price - a.price)
  }
  const handleSortingChange = order => {
    setSortOrder(order)
  }
  const paginateRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord)
  // console.log(paginateRecords)
  const nPages = Math.ceil(sortedData.length / recordsPerPage)
  // console.log(nPages)
  const shouldRenderPagination = products.length > recordsPerPage


  // const handleCreateProduct = () => {
  //   navigate('/admin-create-products');
  // };

  const handleUpdate = (productID) => {
    // console.log(productID)
    navigate(`/admin-update-products/${productID}`);
  }

  const handleDelete = async (productID) => {
    // console.log(productID);
    setProductIdToBeDeleted(productID)
    setShowConfirmationModal(true)
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await DeleteProductbyId(productId);
      if (response.success) {
        // console.log("Product Deleted Successfully!");
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
      } else {
        console.error('Failed to delete the Products Data', response.error);
      }
    } catch (error) {
      console.error('Failed to delete the Products Data', error);
    } finally {
      setShowConfirmationModal(false)
      setProductIdToBeDeleted(null)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        if (response.success) {
          setProducts(response.data);
          // console.log(response)
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
      {showConfirmationModal && <ConfirmDeleteModal Id={productIdToBeDeleted} handleDelete={deleteProduct} setShowConfirmationModal={setShowConfirmationModal} setDataIdToBeDeleted={setProductIdToBeDeleted} />}
      <h1 className="text-center text-2xl font-bold mt-8 mb-8">Admin Dashboard</h1>
      <div className="flex justify-between mb-4">
        <div className='flex px-20'>
          <div className="relative mr-4">
            {/* <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded border"
              value={searchQuery}
              onChange={handleSearchChange}
            /> */}
            <Input placeholder='Search...' className='pl-8 pr-4 py-2 rounded border' value={searchQuery} onChange={handleSearchChange} />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <AiOutlineSearch />
            </div>
          </div>
          <Sorting handleSortingChange={handleSortingChange} />
        </div>
        <Link to="/admin-create-products" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-20">+ ADD PRODUCT</Link>
      </div>

      {/* <Table data={paginateRecords} type="product" handleUpdate={handleUpdate} handleProductDelete={handleProductDelete} /> */}
      <Table
        data={paginateRecords}
        headers={productsArray}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      {shouldRenderPagination && (
        <div className="flex justify-center w-screen items-center">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default Index;

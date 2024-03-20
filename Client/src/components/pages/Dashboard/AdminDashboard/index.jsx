import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProductbyId, getProducts } from '../../../../utils/axios-instance';
import Pagination from '../../../common/Pagination';
import Sorting from '../../../common/Sorting';
import Searching from '../../../common/Searching';
import Table from '../../../common/Table';
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal';
import Input from '../../../common/Input';
import ButtonComponent from '../../../common/ButtonComponent';

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const [searchResults, setSearchResults] = useState([]);
  const [sortingResult, setSortingResult] = useState([]);
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

  const shouldRenderPagination = sortingResult.length > recordsPerPage

  const handleUpdate = (productID) => {
    // console.log(productID)
    navigate(`/admin-update-products/${productID}`);
  };

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
        console.error("Failed to delete the Products Data", response.error);
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
          console.error("Failed to fetch the Products Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching products", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {showConfirmationModal && <ConfirmDeleteModal Id={productIdToBeDeleted} handleDelete={deleteProduct} setShowConfirmationModal={setShowConfirmationModal} setDataIdToBeDeleted={setProductIdToBeDeleted} />}
      <h1 className="text-center text-2xl font-bold mt-8 mb-8">Admin Dashboard</h1>
      <div className="flex justify-between mb-4">
        <div className="flex px-20">
          <div className="display gap-5 flex flex-start flex-col md:flex-row justify-center items-start">
            <Searching
              dataToSearch={products}
              setSearchResults={setSearchResults}
              setCurrentPage={setCurrentPage}
            />
          
          <Sorting
            setSortingResult={setSortingResult}
            searchResults={searchResults}
          />
          </div>
          {/* <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            <AiOutlineSearch />
          </div> */}
        </div>
        <Sorting
          setSortingResult={setSortingResult}
          searchResults={searchResults}
        />
        <ButtonComponent buttonStyle="ml-0 sm:ml-4 mt-3 sm:mt-0 bg-green-500 border-green-500 hover:text-green-500 text-base cursor-pointer">
          <Link to="/admin-create-products">+ ADD PRODUCT</Link>
        </ButtonComponent>
      </div>
      {sortingResult.length>0 ? (
      <Table
       data={sortingResult.slice(indexOfFirstRecord, indexOfLastRecord)}
        headers={productsArray}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      ) : 
      (<div className="text-center py-4 text-xl text-grey-500">Oops not found</div>)
      }   
      {shouldRenderPagination && (
        <Pagination
          nPages={Math.ceil(sortingResult.length / recordsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Index;

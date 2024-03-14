import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProductbyId, getProducts } from '../../../../utils/axios-instance';
import Table from '../../../common/Table';
import useDebounceHook from '../../../../utils/custom-hooks/useDebounce';
import Pagination from '../../../common/Pagination';
import Sorting from '../../../common/Sorting';

const Index = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(6)
  const [searchQuery,setSearchQuery] = useState('')
  const [sortOrder,setSortOrder] = useState(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const indexOfLastRecord=currentPage* recordsPerPage
  const indexOfFirstRecord=indexOfLastRecord-recordsPerPage

console.log(products)
const debouncedQuery = useDebounceHook(searchQuery,500)
const handleSearchChange = e => {
  setSearchQuery(e.target.value)
  setCurrentPage(1)
}
const filteredData = products.filter(product => product.title && product.title.toLowerCase().includes(debouncedQuery.toLowerCase()))
const sortedData = [...filteredData]
if(sortOrder==='asc'){
  sortedData.sort((a,b)=> a.price-b.price)
}
if(sortOrder==='desc'){
  sortedData.sort((a,b)=> b.price-a.price)
}
const handleSortingChange = order => {
  setSortOrder(order)
}
  const paginateRecords = sortedData.slice(indexOfFirstRecord,indexOfLastRecord)
  console.log(paginateRecords)
  const nPages = Math.ceil(sortedData.length /recordsPerPage)
  console.log(nPages)
  const shouldRenderPagination = products.length > recordsPerPage

 
  const handleCreateProduct = () => {
    navigate('/admin-create-products');
  };

  const handleProductUpdate = (productID) => {
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
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button className="text-2xl font-bold mb-4" onClick={handleCreateProduct}>
        Add Product
      </button>

      <div className="relative inline-block text-left absolute left-1/2 transform -translate-x-1/2 top-1/2 z-10">
        <div>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            Options
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isDropdownOpen && (
          <div className="mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              <Link to="/admin/users" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                Users
              </Link>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
                Products
              </a>
              <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
                Categories
              </a>
            </div>
          </div>
        )}
      </div>
      <div className='display flex space-x-10'>
      <input
                type="text"
                placeholder="Search..."
                className="search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <Sorting handleSortingChange={handleSortingChange}/>
</div>
      <Table products={paginateRecords} handleProductUpdate={handleProductUpdate} handleProductDelete={handleProductDelete} />
      { ( shouldRenderPagination &&
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}  
                    />
                )}
      {/* <table className="table-auto w-full mt-8 border">
        <thead>
          <tr className="border-b">
            <th className="w-1/6 p-2">Product ID</th>
            <th className="w-1/3 p-2">Title</th>
            <th className="w-1/6 p-2">Price</th>
            <th className="w-1/6 p-2">Brand</th>
            <th className="w-1/6 p-2">Category</th>
            <th className="w-1/6 p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-2">{product.id}</td>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.price}</td>
              <td className="p-2">{product.brand}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <button onClick={() => handleProductUpdate(product.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    Update
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                  <button onClick={() => handleProductDelete(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default Index;

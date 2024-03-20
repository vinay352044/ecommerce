import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../../common/Pagination';
import { toast } from 'react-toastify';
import Searching from '../../../../common/Searching';
import { deleteUser, getUsers } from '../../../../../utils/axios-instance';
import { AiOutlineSearch } from 'react-icons/ai'; // Importing search icon from react-icons

function Index() {
    
    const [data, setData] = useState([]);
    const [searchResults,setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);


    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const shouldRenderPagination = searchResults.length > recordsPerPage

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (confirmDelete) {
                deleteUser(id)
                .then(res => {
                    console.log(res);
                    setData(data.filter(user => user.id !== id));
                    toast.success('User deleted Successfully!');
                    navigate('/admin-users');
                })
                .catch(err => console.log(err));
        }
    };

    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
     useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (response.success) {
          setData(response.data);
          console.log(data)
        } else {
          console.error('Failed to fetch the Products Data', response.error);
        }
      } catch (error) {
        console.error('Error while Fetching products', error);
      }
    };

    fetchData();
  }, []);

console.log(data)
    return (
        <>
            <div className='p-10'>
                <h1 className="text-2xl font-bold mb-4 text-center">List of Users</h1>
                {data.length === 0 ? (
                <div className="text-center py-4">
                    <h3 className='text-xl text-gray-500'>No users Found!</h3>
                </div>
            ) : (
                    <div>
                        <div className="flex justify-end mb-4">
                            <div className="relative">
                            <Searching
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          productData={data}
          setSearchResults={setSearchResults}
        />
                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <AiOutlineSearch />
                                </div>
                            </div>
                            <Link to="/admin-createUser" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-5 ml-5">+ ADD</Link>
                        </div>
                        
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Password</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.slice(indexOfFirstRecord,indexOfLastRecord).map((d, i) => (
                                    <tr key={i}>
                                        <td className="border px-4 py-2">{d.id}</td>
                                        <td className="border px-4 py-2">{d.name}</td>
                                        <td className="border px-4 py-2">{d.email}</td>
                                        <td className="border px-4 py-2">{d.password}</td>
                                        <td className="border px-4 py-2 flex justify-center items-center space-x-2">
                                            <Link to={`/admin-update/${d.id}`} className="inline-block px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2">Edit</Link>
                                            <button className="inline-block px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={() => handleDelete(d.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination nPages={Math.ceil(searchResults.length / recordsPerPage)} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Index;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../../common/Pagination';
import { toast } from 'react-toastify';
import useDebounceHook from '../../../../../utils/custom-hooks/useDebounce';
import { deleteUser, getUsers } from '../../../../../utils/axios-instance';
import { AiOutlineSearch } from 'react-icons/ai'; // Importing search icon from react-icons

function Index() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
            getUsers()
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const debouncedQuery = useDebounceHook(searchQuery, 500);
    const filteredData = data.filter(user => user.name && user.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const nPages = Math.ceil(filteredData.length / recordsPerPage);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const slicedData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

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
                                <input
                                    type='text'
                                    placeholder='Search..'
                                    onChange={handleSearchChange}
                                    value={searchQuery}
                                    className="pl-8 pr-4 py-2 rounded border w-48"
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
                                {slicedData.map((d, i) => (
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
                        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Index;


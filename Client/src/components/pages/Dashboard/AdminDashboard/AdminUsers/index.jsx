import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../../common/Pagination';

function Index() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    // const [orders, setOrders]= useState([]);    //delete order
     
    useEffect(() => {
      axios.get('http://localhost:3000/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    }, []);

    //delete order
    // useEffect(() => {
    //   axios.get('http://localhost:3000/orders')
    //   .then(res => setOrders(res.data))
    //   .catch(err => console.log(err));
    // }, []);
    
    const [currentPage , setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5); 
    const nPages= Math.ceil((data.length) / recordsPerPage );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const slicedData= data.slice(indexOfFirstRecord , indexOfLastRecord);

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure you want to delete?');
        if (confirm) {
            axios.delete(`http://localhost:3000/users/${id}`)
                .then(res => {
                    console.log(res);
                    setData(data.filter(user => user.id !== id));
                    navigate('/admin/users');
                })
                .catch(err => console.log(err));
            //delete order
            axios.delete(`http://localhost:3000/orders?user_id=${id}`)
            .then(res => {
                console.log(res);
                // navigate('/admin/users');
            })
            .catch(err => console.log(err));
        }
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">List of Users</h1>
                <div>
                    <div className="flex justify-end mb-4">
                        <Link to="/admin-createUser" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-5">+ ADD</Link>
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
                                    <td className="border px-4 py-2"SSWAS2W23>{d.password}</td>
                                    <td className="border px-4 py-2">
                                        {/* <Link to={`/read/${d.userId}`} className="inline-block px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Read</Link> */}
                                        <Link to={`/admin-update/${d.id}`} className="inline-block px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-2">Edit</Link>
                                        <button className="inline-block px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2" onClick={() => handleDelete(d.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </>
    );
}

export default Index;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateUsers() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(res => {
                setValues(res.data);
                console.log(values)
            })
            .catch(err => console.log(err));
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://:3000/users/${userId}`, values);
            alert('User updated successfully!');
            navigate('/admin/users');
        } catch (error) {
            console.log(error);
            alert('Error updating user.');
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl mb-5">Update User Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" autoComplete="name" required
                        value={values.name}
                        onChange={e => setValues({ ...values, name: e.target.value })}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" autoComplete="email" required
                        value={values.email}
                        onChange={e => setValues({ ...values, email: e.target.value })}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" name="phone" autoComplete="tel" required
                        value={values.password}
                        onChange={e => setValues({ ...values, password: e.target.value })}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                </div>
                <button type="submit"
                    className="inline-block px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update
                </button>
                <Link to="/admin/users" className="inline-block px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-2">
                    Back
                </Link>
            </form>
        </div>
    );
}

export default UpdateUsers;

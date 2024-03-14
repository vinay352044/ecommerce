import axios from 'axios';
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const errors = {
};
function AdminCreateUser() {
    const [data , setData] = useState([]);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    console.log(errors);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    console.log(data);


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/users', {id: data.length !== 0 ? (parseInt(data[data.length - 1].id) + 1).toString() : "1",
        ...values})
            .then(res => {
                console.log(res);
                navigate('/admin-users');
            })
            .catch(err => console.log(err));
        toast.success('user created successfully!');
    };

    return (
        <div className='flex justify-center items-center h-[70vh]'>
        <div className="flex flex-col w-[500px] sm:px-5">
            <h1 className="text-3xl mb-5">Add user</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" autoComplete="name" required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm "
                        onChange={e => {
                            setValues({ ...values, name: e.target.value })
                            if(values.name.length < 2){
                                errors.name = "Name must be of atleast 2 charactors";
                                // console.log(errors);
                            }else{
                                errors.name = "";
                            }
                        }} />
                        {errors.name !== "" ? <p>{errors.name}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" autoComplete="email" required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        onChange={e => setValues({ ...values, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">password</label>
                    <input type="password" id="password" name="password" autoComplete="tel" required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        onChange={e => setValues({ ...values, password: e.target.value })} />
                </div>
                <button type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
                <button type="button"
                    className="inline-flex justify-center ml-2 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={()=>navigate('/admin-users')}>
                    Back
                </button>
            </form>
        </div>
        </div>
    );
}

export default AdminCreateUser;


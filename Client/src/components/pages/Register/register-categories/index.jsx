import axios from 'axios';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

function AdminCreateCategories() {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        axios.post('http://localhost:3000/users', {
            name: values.name
        })
        .then(res => {
            console.log(res);
            navigate('/admin-users');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-3xl mb-5">Create Categories</h1>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                }}
            >
                <Form>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter Name</label>
                        <Field type="text" id="name" name="name" autoComplete="name" required
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>
                    <button type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default AdminCreateCategories;

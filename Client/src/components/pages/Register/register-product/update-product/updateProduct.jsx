import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { getProductById, updateProduct } from '../../../../../utils/axios-instance';
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';


const UpdateProduct = () => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productID);
                if (response.success) {
                    setProduct(response.data);
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error while fetching product", error);
            }
        };

        fetchProduct();
    }, [productID]);

    const handleSubmit = async (values) => {
        try {
            const updatedProduct = {
                ...product,
                ...values,
            };

            const { success, error } = await updateProduct(updatedProduct);

            if (success) {
                console.log('Product updated successfully!');
                navigate("/admin");
            } else {
                console.error('Error updating product:', error);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Formik initialValues={product} onSubmit={handleSubmit}>
            <div className="container mx-auto p-4">
                <Form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="title" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Title
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Product Title"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Description
                            </label>
                            <Field
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Product Description"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor="price" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Price
                            </label>
                            <Field
                                type="text"
                                id="price"
                                name="price"
                                placeholder="Product Price"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor="discountPercentage" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Discount Percentage
                            </label>
                            <Field
                                type="text"
                                id="discountPercentage"
                                name="discountPercentage"
                                placeholder="Discount Percentage"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3">
                            <label htmlFor="stock" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Stock
                            </label>
                            <Field
                                type="text"
                                id="stock"
                                name="stock"
                                placeholder="Product Stock"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label htmlFor="category" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Category
                            </label>
                            <Field
                                as="select"
                                id="category"
                                name="category"
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                                <option value="" disabled selected>Select Category</option>
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </Field>
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label htmlFor="brand" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Brand
                            </label>
                            <Field
                                type="text"
                                id="brand"
                                name="brand"
                                placeholder="Product Brand"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3">
                            <label htmlFor="total_sell" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Total Sell
                            </label>
                            <Field
                                type="text"
                                id="total_sell"
                                name="total_sell"
                                placeholder="Total Sell"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label htmlFor="images" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Images
                            </label>
                            <Field
                                type="text"
                                id="images"
                                name="images"
                                placeholder="Image URLs"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};

export default UpdateProduct;


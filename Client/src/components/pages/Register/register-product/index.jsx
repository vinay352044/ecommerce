import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  addProduct,
  getProducts,
  updateSellerProducts,
} from "../../../../utils/axios-instance";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../../../redux/actions/roleAction";
import Input from "../../../common/Input";

const InitialValues = {
  title: "",
  description: "",
  price: "",
  discountPercentage: "",
  stock: "",
  category: "",
  brand: "",
  total_sell: "",
  thumbnail: "",
};

const Index = () => {
  const inputStyle =
    "block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2";
  const inputStyle1 =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { seller } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        if (response.success) {
          setProducts(response.data);
        } else {
          console.error("Failed to fetch the Products Data", response.error);
        }
      } catch (error) {
        console.error("Error while Fetching products", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const newProductId =
        products.length === 0
          ? 1
          : parseInt(products[products.length - 1].id) + 1;

      const newProduct = {
        ...values,
        id: newProductId.toString(),
      };

      const { success, error } = await addProduct(newProduct);

      if (success) {
        if (seller) {
          const { success, error, data } = await updateSellerProducts(
            seller,
            newProduct.id.toString()
          );
          dispatch(setRole("seller", data));
          if (success) {
            navigate("/seller-products");
          }
        } else {
          navigate("/admin");
        }
      } else {
        console.error("Error adding product:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-8 mb-2 w-1/2 mx-auto">
        Register Product
      </h1>

      <Formik initialValues={InitialValues} onSubmit={handleSubmit}>
        <div>
          <Form className=" flex justify-center items-center flex-col">
            <div className="mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="title" className={inputStyle}>
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Product Title"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="description" className={inputStyle}>
                  Description
                </label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Product Description"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="price" className={inputStyle}>
                  Price
                </label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Product Price"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="discountPercentage" className={inputStyle}>
                  Discount Percentage
                </label>
                <Input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  placeholder="Discount Percentage"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full md:w-1/3 px-3">
                <label htmlFor="stock" className={inputStyle}>
                  Stock
                </label>
                <Input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Product Stock"
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label htmlFor="category" className={inputStyle}>
                  Category
                </label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Product category"
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label htmlFor="brand" className={inputStyle}>
                  Brand
                </label>
                <Input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="Product Brand"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full md:w-1/3 px-3">
                <label htmlFor="total_sell" className={inputStyle}>
                  Total Sell
                </label>
                <Input
                  type="number"
                  id="total_sell"
                  name="total_sell"
                  placeholder="Total Sell"
                />
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label htmlFor="thumbnail" className={inputStyle}>
                  Add Image URL
                </label>
                <Input
                  type="text"
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Image URLs"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Product
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default Index;

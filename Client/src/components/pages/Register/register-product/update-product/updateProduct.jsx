import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  getProductById,
  updateProduct,
} from "../../../../../utils/axios-instance";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../../../../common/Input";
import ButtonComponent from "../../../../common/ButtonComponent";

const UpdateProduct = () => {
  const { productID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { seller } = useSelector((state) => state.role);

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
        // console.log('Product updated successfully!');
        seller ? navigate("/seller-products") : navigate("/admin");
      } else {
        console.error("Error updating product:", error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <h1 className="text-center text-2xl font-bold">Update Product</h1>
      <Formik initialValues={product} onSubmit={handleSubmit}>
        <div className="flex justify-center items-center flex-col shadow-2xl rounded-md py-8 px-5 md:px-[5rem]">
          <Form className="flex justify-center items-center gap-3 flex-col">
            <div className="">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Product Title"
                value={product.title}
              />
            </div>
            <div className="">
              <label
                htmlFor="description"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Description
              </label>
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Product Description"
                value={product.description}
              />
            </div>

            <div className="">
              <label
                htmlFor="price"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Price
              </label>
              <Input
                type="text"
                id="price"
                name="price"
                placeholder="Product Price"
                value={product.price}
              />
            </div>

            <div className="">
              <label
                htmlFor="discountPercentage"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Discount Percentage
              </label>
              <Input
                type="text"
                id="discountPercentage"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={product.discountPercentage}
              />
            </div>

            <div className="">
              <label
                htmlFor="stock"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Stock
              </label>
              <Input
                type="text"
                id="stock"
                name="stock"
                placeholder="Product Stock"
                value={product.stock}
              />
            </div>

            <div className="">
              <label
                htmlFor="brand"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Brand
              </label>
              <Input
                type="text"
                id="brand"
                name="brand"
                placeholder="Product Brand"
                value={product.brand}
              />
            </div>

            <div className="">
              <label
                htmlFor="total_sell"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Total Sell
              </label>
              <Input
                type="text"
                id="total_sell"
                name="total_sell"
                placeholder="Total Sell"
                value={product.total_sell}
              />
            </div>

            <div className="">
              <label
                htmlFor="images"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold"
              >
                Images
              </label>
              <Input
                type="text"
                id="images"
                name="images"
                placeholder="Image URLs"
                value={product.images}
              />
            </div>

            <div className="mb-6">
              <div className="w-full px-3">
                <ButtonComponent type="submit" buttonStyle="mt-[0.6rem]">
                  Submit
                </ButtonComponent>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default UpdateProduct;

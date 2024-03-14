import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateCategory, getCategoryById } from '../../../../../utils/axios-instance';


function UpdateCategories() {
  const navigate = useNavigate();
  const { categoryID } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(categoryID);
        if (response.success) {
          console.log(response.data);
          setCategoryData(response.data);
        } else {
          console.error("Category not found");
        }
      } catch (error) {
        console.error("Error while fetching category", error);
      }
    };

    fetchCategory();
  }, [categoryID]);

  const handleSubmit = async (values) => {
    try {
      const response = await UpdateCategory(values);
      if (response.success) {
        navigate("/admin-categories")
        console.log("Category updated successfully:", response.data);
      } else {
        console.error("Failed to update category:", response.error);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl mb-5">Update Category</h1>
      {categoryData && (
        <Formik
          initialValues={categoryData}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Update Category Name</label>
              <Field type="text" id="name" name="name"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
            </div>
            <button type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Update
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
}

export default UpdateCategories;


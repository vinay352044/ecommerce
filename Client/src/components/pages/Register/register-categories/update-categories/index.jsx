import { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateCategory,
  getCategoryById,
} from "../../../../../utils/axios-instance";
import Input from "../../../../common/Input";
import ButtonComponent from "../../../../common/ButtonComponent";
import * as Yup from "yup";

function UpdateCategories() {
  const navigate = useNavigate();
  const { categoryID } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(categoryID);
        if (response.success) {
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

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await UpdateCategory(values);
      if (response.success) {
        navigate("/admin-categories");
      } else {
        console.error("Failed to update category:", response.error);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex justify-center items-center bg-white py-8 px-5 md:px-[5rem] flex-col rounded-md">
        <h1 className="text-3xl mb-5 font-bold">Update Category</h1>
        {categoryData && (
          <Formik
            initialValues={categoryData}
            onSubmit={handleSubmit}
            validationSchema={CategorySchema}
          >
            <Form className="flex justify-center items-center flex-col rounded-md py-8 px-5 md:px-[5rem]">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Category Name
                </label>
                <Input type="text" id="name" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <ButtonComponent type="submit" buttonStyle="mt-[0.6rem] text-sm">
                Update
              </ButtonComponent>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}

export default UpdateCategories;

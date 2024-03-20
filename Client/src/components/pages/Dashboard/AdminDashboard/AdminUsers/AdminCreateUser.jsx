import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../../../../utils/axios-instance";
import Input from "../../../../common/Input";

const errors = {};
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
function AdminCreateUser() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setValues((prevValue) => {
      return {
        ...prevValue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (values.name.length < 2) {
      validationErrors.name = "Name must be at least 2 characters";
    }

    if (!passwordRules.test(values.password)) {
      validationErrors.password =
        "Password must contain 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 4 characters long";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await createUser({
          id:
            data.length !== 0
              ? (parseInt(data[data.length - 1].id) + 1).toString()
              : "1",
          ...values,
          favouriteProducts: [],
        });
        toast.success("User created successfully!");
        navigate("/admin-users");
      } catch (error) {
        toast.error("Error in creating the user");
      }
    }
  };

  return (
    <div className="flex justify-center flex-col items-center mt-10">
      <h1 className="text-3xl mb-5">Add user</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
          {errors.name !== "" ? <p>{errors.name}</p> : null}
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          {errors.password !== "" ? <p>{errors.password}</p> : ""}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <button
          type="button"
          className="inline-flex justify-center ml-2 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => navigate("/admin-users")}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default AdminCreateUser;

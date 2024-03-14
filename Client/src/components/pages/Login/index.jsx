import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getSellers, getUsers } from "../../../utils/axios-instance";
import { setRole } from "../../../redux/actions/roleAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const loginSchema = yup.object({
  role: yup
    .string()
    .required("*required")
    .oneOf(["user", "admin", "seller"], "*Please select a valid role"),
  email: yup.string().required("*required").trim(),
  password: yup.string().required("*required").trim(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.role);
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: {
      role: "user",
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    const { role, email, password } = values;

    if (role === "user") {
      let user = users.find((user) => user.email === email);
      if (user && user.password === password) {
        dispatch(setRole(role, user));
        toast.success(`User: ${user.name} logged in successfully`);
        navigate("/");
      } else {
        toast.error("Invalid credential !!");
      }
    }

    if (role === "seller") {
      let seller = sellers.find((seller) => seller.email === email);
      if (seller && seller.password === password) {
        dispatch(setRole(role, seller));
        toast.success(`Seller: ${seller.name} logged in successfully`);
        navigate("/");
      } else {
        toast.error("Invalid credential !!");
      }
    }

    if (role === "admin") {
      const admin = { email, password };
      if (email === "admin@gmail.com" && password === "Admin@123") {
        dispatch(setRole(role, admin));
        toast.success("Admin logged in successfully!");
        navigate("/admin");
      } else {
        toast.error("Invalid credential !!");
      }
    }

    handleReset();
  }

  useEffect(() => {
    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();
      const {
        success: sellerSuccess,
        data: sellersData,
        error: sellerError,
      } = await getSellers();

      if (userError) {
        // dispatch error
        toast.error("Something went wronge. Try again later!");
      }
      if (sellerError) {
        // dispatch error
        toast.error("Something went wronge. Try again later!");
      }

      setUsers(usersData);
      setSellers(sellersData);
    })();
    
    // if looged in then don't give access to this page
    isAuth ? navigate("/") : null;
  }, []);

  return (
    <div className="flex bg-white justify-center items-center py-10">
      <div className="flex flex-col gap-5 py-8 px-5 md:px-[5rem!important] shadow-2xl rounded-md">
        <h3 className="text-center text-3xl font-bold ">Login</h3>

        <div className="flex justify-center items-center gap-10">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-2 w-[400px]"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <FaUser />
                <label htmlFor="role" className="font-semibold">
                  Role
                </label>
              </div>
              <select
                name="role"
                id="role"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue="user"
                className="border-2 rounded-md border-gray-500 focus:ring-0"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
              </select>
              {touched.role && errors.role ? (
                <p className="text-[14px] text-red-700">{errors.role}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <MdEmail />
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="dhruv@example.com"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.email && errors.email ? (
                <p className="text-[14px] text-red-700">{errors.email}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <RiLockPasswordFill />
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="ranDom1$"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.password && errors.password ? (
                <p className="text-[14px] text-red-700">{errors.password}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="w-full border-[2px] rounded-md border-[#0295db] text-[#0295db] py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-[#0295db] hover:text-white transition-all duration-250 ease-in-out basis-[30%]"
              >
                Submit
              </button>

              <button
                type="reset"
                className="w-full border-[1px] border-red-800 rounded-md text-red-900 py-2 flex items-center justify-center gap-2 font-medium text-xl hover:bg-red-700 hover:text-white transition-all duration-250 ease-in-out basis-[30%]"
              >
                Reset
              </button>
            </div>

            <div className="pt-5">
              <p>
                Don't have an account?{" "}
                <NavLink
                  to="/register"
                  className="text-[#0295db]  border-[#0295db] hover:border-b-[1px]"
                >
                  Register here
                </NavLink>
              </p>
            </div>
          </form>

          <div className="hidden lg:block">
            <img src="/images/Mobile-login.gif" alt="Login Demo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

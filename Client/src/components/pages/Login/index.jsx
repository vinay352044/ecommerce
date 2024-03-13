import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { getSellers, getUsers } from "../../../utils/axios-instance";
import { setRole } from "../../../redux/actions/roleAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const loginSchema = yup.object({
  role: yup
    .string()
    .required("required")
    .oneOf(["user", "admin", "seller"], "Please select a valid role"),
  email: yup.string().required("Required").trim(),
  password: yup.string().required("Required").trim(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      let user = users.find(user => user.email === email);
      if(user && user.password === password){
        dispatch(setRole(role, user));
        toast.success(`User: ${user.name} logged in sucessfully`);
        navigate("/");
      }else{
        toast.error("Invalid credential !!");
      }
    }
    
    if(role === "seller"){
      let seller = sellers.find(seller => seller.email === email);
      if(seller && seller.password === password){
        dispatch(setRole(role, seller));
        toast.success(`Seller: ${seller.name}logged in sucessfully`);
        navigate("/");
      }else{
        toast.error("Invalid credential !!");
      }
    }

    if(role === "admin"){
      const admin = {email, password};
      if(email === "admin@gmail.com" && password === "Admin@123"){
        dispatch(setRole(role, admin));
        toast.success("Admin logged in sucessfully!");
        navigate("/");
      }else{
        toast.error("Invalid credential !!");
      }
    }

    handleReset();
  }

  useEffect(() => {
    (async () => {
      const {
        sucess: usersSucess,
        data: usersData,
        error: userError,
      } = await getUsers();
      const {
        sucess: sellerSucess,
        data: sellersData,
        error: sellerError,
      } = await getSellers();

      if (userError) {
        // dispatch error
        console.log(userError);
      }
      if (sellerError) {
        // dispatch error
        console.log(sellerError);
      }

      setUsers(usersData);
      setSellers(sellersData);
    })();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col"
      >
        <label htmlFor="role">Role</label>
        <select
          name="role"
          id="role"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue="user"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
        </select>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email ? <p>{errors.email}</p> : null}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password ? <p>{errors.password}</p> : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

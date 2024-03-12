import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../../../common/Button";
import * as yup from "yup";
import {
  getSellers,
  getUsers,
  registerUser,
} from "../../../../utils/axios-instance";
import {useDispatch} from 'react-redux';
import { setRole } from "../../../../redux/actions/roleAction";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const userSchema = yup.object({
  name: yup
    .string()
    .required("required")
    .min(2, "Name must be of atleast 2 charactor")
    .max(15, "Name must be of atmost 15 charactors")
    .trim(),
  email: yup.string().required("required").email("Email is not valid").trim(),
  password: yup
    .string()
    .required("required")
    .matches(passwordRules, { message: "Please create a stronger password" }),
  cpassword: yup
    .string()
    .required("required")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        cpassword: "",
      },
      validationSchema: userSchema,
      onSubmit,
    });

  async function onSubmit(values) {
    const { name, email, password } = values;

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );
    const emailExistsInSellers = sellers.findIndex(
      (seller) => seller.email === values.email
    );

    if (emailExistsInUsers === -1 && emailExistsInSellers === -1) {
      // user not exists
      let userObj = {
        userId: (parseInt(users[users.length - 1].userId) + 1).toString(),
        name,
        email,
        password,
        favouriteProducts: [],
      };

      const { sucess, data, error } = await registerUser(userObj);
      console.log(sucess, data, error);
      if(sucess){
        dispatch(setRole("user", userObj));
      }
    } else {
      // user exists already
      // Toastify
      console.log("User Exists already");
    }
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
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {touched.name && errors.name ? <p>{errors.name}</p> : null}

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

        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.cpassword}
        />
        {touched.cpassword && errors.cpassword ? (
          <p>{errors.cpassword}</p>
        ) : null}

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default RegisterUser;

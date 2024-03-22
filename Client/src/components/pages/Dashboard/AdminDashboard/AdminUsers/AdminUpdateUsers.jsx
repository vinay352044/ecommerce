import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserFromAdmin } from "../../../../../utils/axios-instance";
import Input from "../../../../common/Input";
import ButtonComponent from "../../../../common/ButtonComponent";
import { GoEye, GoEyeClosed } from "react-icons/go";
import * as yup from 'yup';
import { useFormik } from "formik";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import RegisterSeller from "../../../Register/register-seller";
import RegisterUser from "../../../Register/register-user";

// const passwordRules =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
// const emailRules =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
const userSchema = yup.object({
  name: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  email: yup.string().required("*required").email("*Email is not valid").trim(),
  password: yup
    .string()
    .required("*required")
    .matches(
      passwordRules,
      "*Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number"
    ),
});

function AdminUpdateUsers() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [showPass, setShowPass] = useState(false);

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
      name: userData.name,
      email: userData.email,
      password: userData.password
    },
    validationSchema: userSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));

    console.log(userData);
  }, [id]);

  return (
    <RegisterUser isAdminCreateUser={true} userData={userData}/>
  );
}

export default AdminUpdateUsers;

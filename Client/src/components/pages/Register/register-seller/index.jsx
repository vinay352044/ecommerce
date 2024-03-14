import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  getSellers,
  getUsers,
  registerSeller,
} from "../../../../utils/axios-instance";
import { setRole } from "../../../../redux/actions/roleAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";
import { MdConfirmationNumber, MdEmail } from "react-icons/md";
import { TbBrandAirtable } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
const gstinRules = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const sellerSchema = yup.object({
  name: yup
    .string()
    .required("*required")
    .min(2, "*Name must contain atleast 2 characters")
    .max(15, "*Name must not contain more than 15 characters")
    .trim(),
  businessName: yup
    .string()
    .required("*required")
    .min(5, "*Business name must contain atleast 5 characters")
    .trim(),
  gstin: yup
    .string()
    .required("*GSTIN required for selling products on Bac-Mart")
    .matches(gstinRules, "*GSTIN must be in the format of 22AAAAA0000A1Z5"),
  brand: yup
    .string()
    .required("*required")
    .min(2, "*Brand name must contain atleast 2 characters"),
  email: yup.string().required("*required").email("*Email is not valid").trim(),
  password: yup
    .string()
    .required("*required")
    .matches(
      passwordRules,
      "*Password must contain 1 UpperCase, 1 Lowercase, 1 special characters and 1 number"
    ),
  cpassword: yup
    .string()
    .required("*required")
    .oneOf([yup.ref("password")], "*Passwords must match"),
});

const RegisterSeller = () => {
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
      name: "",
      businessName: "",
      gstin: "",
      brand: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: sellerSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    const { name, businessName, gstin, brand, email, password } = values;

    const emailExistsInUsers = users.findIndex(
      (user) => user.email === values.email
    );
    const emailExistsInSellers = sellers.findIndex(
      (seller) => seller.email === values.email
    );

    if (emailExistsInUsers === -1 && emailExistsInSellers === -1) {
      let sellerObj = {
        id:
          sellers.length !== 0
            ? (parseInt(sellers[sellers.length - 1].id) + 1).toString()
            : "1",
        name,
        businessName,
        gstin,
        brand,
        email,
        password,
        productsToSell: [],
      };

      const { success, data, error } = await registerSeller(sellerObj);
      if (success) {
        dispatch(setRole("seller", sellerObj));
        handleReset();
        toast.success("Seller registered successfully");
        navigate("/");
      }
    } else {
      // user exists already
      toast.error("User already exists!!");
      handleReset();
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
        toast.error("Something went wronge. Try again later!");
      }
      if (sellerError) {
        // dispatch error
        toast.error("Something went wronge. Try again later!");
      }

      setUsers(usersData);
      setSellers(sellersData);
    })();
  }, []);

  return (
    <div className="flex bg-white justify-center items-center py-10">
      <div className="flex flex-col gap-5 py-8 px-5 md:px-[5rem!important] shadow-2xl rounded-md">
        <h3 className="text-center text-3xl font-bold ">Register Seller</h3>

        <div className="flex justify-center items-center gap-10">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="flex flex-col gap-2 w-[min(400px,90vw)]"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <FaUser />
                <label htmlFor="name" className="font-semibold">
                  Name
                </label>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Dhruv Prajapati"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.name && errors.name ? (
                <p className="text-[14px] text-red-700">{errors.name}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <FaBusinessTime />
                <label htmlFor="businessName" className="font-semibold">
                  Business Name
                </label>
              </div>
              <input
                type="text"
                name="businessName"
                id="businessName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.businessName}
                placeholder="Dhruv Mobile World"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.businessName && errors.businessName ? (
                <p className="text-[14px] text-red-700">
                  {errors.businessName}
                </p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <MdConfirmationNumber />
                <label htmlFor="gstin" className="font-semibold">
                  GST NO
                </label>
              </div>
              <input
                type="text"
                name="gstin"
                id="gstin"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gstin}
                placeholder="22AAAAA0000A1Z5"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.gstin && errors.gstin ? (
                <p className="text-[14px] text-red-700">{errors.gstin}</p>
              ) : (
                <p className="text-[14px] opacity-0">null</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <TbBrandAirtable />
                <label htmlFor="brand" className="font-semibold">
                  Brand
                </label>
              </div>
              <input
                type="text"
                name="brand"
                id="brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
                placeholder="Samsung"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.brand && errors.brand ? (
                <p className="text-[14px] text-red-700">{errors.brand}</p>
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

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <RiLockPasswordFill />
                <label htmlFor="cpassword" className="font-semibold">
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cpassword}
                placeholder="ranDom1$"
                className="border-2 rounded-md border-black focus:ring-0"
              />
              {touched.cpassword && errors.cpassword ? (
                <p className="text-[14px] text-red-700">{errors.cpassword}</p>
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
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-[#0295db]  border-[#0295db] hover:border-b-[1px]"
                >
                  Login here
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

export default RegisterSeller;

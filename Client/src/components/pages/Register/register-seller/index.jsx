import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { getSellers, getUsers, registerSeller } from "../../../../utils/axios-instance";
import { setRole } from "../../../../redux/actions/roleAction";
import { useEffect, useState } from "react";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const gstinRules = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const sellerSchema = yup.object({
  name: yup
    .string()
    .required("required")
    .min(2, "Name must be of atleast 2 charactor")
    .max(15, "Name must be of atmost 15 charactors")
    .trim(),
  businessName: yup
    .string()
    .required("required")
    .min(5, "Business name must be of atleast 5 charactors")
    .trim(),
  gstin: yup
    .string()
    .required("GSTIN required for selling products on Bac-Mart")
    .matches(gstinRules, "gstin must contain numbers and charactors"),
  brand: yup.string()
    .required("required")
    .min(2, "brand name must be of atleast 2 charactors"),
  email: yup.string().required("required").email("Email is not valid").trim(),
  password: yup
    .string()
    .required("required")
    .matches(passwordRules, "Please create a stronger password"),
  cpassword: yup
    .string()
    .required("required")
    .matches(passwordRules, "Please create a stronger password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterSeller = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, handleReset } =
    useFormik({
      initialValues: {
        name: "",
        businessName: "",
        gstin: "22AAAAA0000A1Z5",
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
        id: (parseInt(sellers[sellers.length - 1].id) + 1).toString(),
        name,
        businessName,
        gstin,
        brand,
        email,
        password,
        productsToSell: [],
      };

      const { sucess, data, error } = await registerSeller(sellerObj);
      if (sucess) {
        dispatch(setRole("seller", sellerObj));
        handleReset();
      } else {
        // user exists already
        // Toastify
        console.log("User Exists already");
      }
    } else {
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
      <form onSubmit={handleSubmit} onReset={handleReset} className="flex flex-col">
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

        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          name="businessName"
          id="businessName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.businessName}
        />
        {touched.businessName && errors.businessName ? (
          <p>{errors.businessName}</p>
        ) : null}

        <label htmlFor="gstin">GST NO</label>
        <input
          type="text"
          name="gstin"
          id="gstin"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.gstin}
        />
        {touched.gstin && errors.gstin ? <p>{errors.gstin}</p> : null}

        <label htmlFor="brand">brand</label>
        <input
          type="text"
          name="brand"
          id="brand"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.brand}
        />
        {touched.brand && errors.brand ? <p>{errors.brand}</p> : null}

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

export default RegisterSeller;

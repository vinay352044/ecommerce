import { useFormik } from "formik"

const RegisterSeller = () => {
  const {values, errors, touched, handleChange, handleSubmit, handleBlue} = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      gstin: "",
      category: "",
      email: "",
      password: "",
      cpassword: ""
    }
  })
  return (
    <div>RegisterSeller</div>
  )
}

export default RegisterSeller
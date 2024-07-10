import axios from "axios"
import React, { useState } from "react"
import { toast } from "react-toastify"
import Loader from "../../common/Loader"
import {FaPhoneAlt, FaUser} from "react-icons/fa"
import {IoIosMail} from "react-icons/io"
import { MdMessage } from "react-icons/md";
import Input from "../../common/Input"

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const { name, email, phone, message } = formData

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	async function translateMessage(text) {
		if (text === undefined || text === null || text.trim().length === 0) return ""

		const translateAPI = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURI(
			text
		)}`

		try {
			const response = await axios.get(translateAPI, { timeout: 5000 })
			if (response.status == 200) {
				return response.data[0][0][0]
			}
		} catch (err) {
			return "-"
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setIsLoading(true)
			const translatedMessage = await translateMessage(message)
			const response = await axios.post(
				import.meta.env.VITE_CONTACT_FORM_DATA_API,
				{
					name: name,
					email: email,
					"phone no": phone,
					message: message,
					"translated message": translatedMessage,
					"date/time": new Date().toLocaleString("en-in"),
				},
				{
					timeout: 5000,
				}
			)
			if (response.status == 201) {
				toast.success("Message Sent Successfully")
			} else {
				throw new Error("Something Went Wrong")
			}
			setIsLoading(false)
			setFormData({ name: "", email: "", phone: "", message: "" })
		} catch (error) {
			setIsLoading(false)
			toast.error("Something Went Wrong")
		}
	}

	const inputGroupClass = "flex flex-col mt-2"
	const inputLabelClass = "text text-gray-600 flex items-center gap-2 mb-1 text-[#0295db!important]"

	return (
		<>
			{isLoading && <Loader />}
			<div className="mt-10 text-center text-3xl">
				<h1>Contact Us</h1>
			</div>
			<div className="flex justify-center items-center">
				<div className="contact-form mt-3 p-2 md:p-[1.5rem!important] rounded shadow bg-slate-100">
					<form onSubmit={handleSubmit}>
						<div className={inputGroupClass}>
							<label htmlFor="name" className={inputLabelClass}>
								<FaUser /> Name
							</label>
							<Input
								className="border-gray-200"
								type="text"
								name="name"
								id="name"
								value={formData.name}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="email" className={inputLabelClass}>
							<IoIosMail /> Email
							</label>
							<Input
								className="border-gray-200"
								type="email"
								name="email"
								id="email"
								value={formData.email}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="phone" className={inputLabelClass}>
								<FaPhoneAlt /> Contact No <small>(optional)</small>
							</label>
							<Input
								className="border-gray-200"
								type="number"
								name="phone"
								id="phone"
								value={formData.phone}
								onChange={handleInputChange}
								autoComplete="off"
							/>
						</div>
						<div className={inputGroupClass}>
							<label htmlFor="message" className={inputLabelClass}>
							 <MdMessage />	Message
							</label>
							<textarea
								className="px-2 py-1 border-2 rounded-md focus:outline-none border-gray-200 focus:ring-0 w-[min(24rem,85vw)]"
								name="message"
								id="message"
								cols="30"
								rows="5"
								value={formData.message}
								onChange={handleInputChange}
								autoComplete="off"
								required
							/>
						</div>
						<div className="form-btn">
							<button
								type="submit"
								className="bg-[#0295db!important] outline-none hover:bg-[white!important] mt-4 px-3 py-1 rounded-md text-white hover:text-[#0295db] border-2 border-[#0295db!important] transition">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
export default Contact

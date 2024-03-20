import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../../../../common/Pagination"
import { toast } from "react-toastify"
import useDebounceHook from "../../../../../utils/custom-hooks/useDebounce"
import { deleteUser, getUsers } from "../../../../../utils/axios-instance"
import { AiOutlineSearch } from "react-icons/ai" // Importing search icon from react-icons
import Table from "../../../../common/Table"
import ConfirmDeleteModal from "../../../../common/ConfirmDeleteModal"
import Input from "../../../../common/Input"
import ButtonComponent from "../../../../common/ButtonComponent"

function Index() {
	const [data, setData] = useState([])
	const [searchQuery, setSearchQuery] = useState("")
	const [showConfirmationModal, setShowConfirmationModal] = useState(false)
	const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		getUsers()
			.then((res) => setData(res.data))
			.catch((err) => console.log(err))
	}, [])

	const handleUpdate = (id) => {
		navigate(`/admin-update/${id}`)
	}

	const debouncedQuery = useDebounceHook(searchQuery, 500)
	const filteredData = data.filter(
		(user) => user.name && user.name.toLowerCase().includes(debouncedQuery.toLowerCase())
	)
	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(5)
	const nPages = Math.ceil(filteredData.length / recordsPerPage)

	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
	const slicedData = filteredData.slice(indexOfFirstRecord, indexOfLastRecord)

	const handleDelete = (userId) => {
		setUserIdToBeDeleted(userId)
		setShowConfirmationModal(true)
	}

	const userArray = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "name" },
		{ key: "email", label: "email" },
		{ key: "password", label: "password" },
	]
	const deleteUserById = (userId) => {
		deleteUser(userId)
			.then((res) => {
				// console.log(res);
				setData(data.filter((user) => user.id !== userId))
				toast.success("User deleted Successfully!")
				navigate("/admin-users")
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setShowConfirmationModal(false)
				setUserIdToBeDeleted(null)
			})
	}

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value)
		setCurrentPage(1)
	}

	return (
		<>
			{showConfirmationModal && (
				<ConfirmDeleteModal
					Id={userIdToBeDeleted}
					handleDelete={deleteUserById}
					setShowConfirmationModal={setShowConfirmationModal}
					setDataIdToBeDeleted={setUserIdToBeDeleted}
				/>
			)}
			<div className="p-10">
				<h1 className="text-2xl font-bold mb-4 text-center">List of Users</h1>
				{data.length === 0 ? (
					<div className="text-center py-4">
						<h3 className="text-xl text-gray-500">No users Found!</h3>
					</div>
				) : (
					<div>
						<div className="flex justify-end mb-4">
							<div className="relative">
								{/* <input
                                    type='text'
                                    placeholder='Search..'
                                    onChange={handleSearchChange}
                                    value={searchQuery}
                                    className="pl-8 pr-4 py-2 rounded border w-48"
                                /> */}
								<Input
									placeholder="Search..."
									onChange={handleSearchChange}
									value={searchQuery}
									className="pl-8 pr-4 py-2 rounded border w-48"
								/>
								<div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
									<AiOutlineSearch />
								</div>
							</div>
							<ButtonComponent buttonStyle="ml-5 bg-green-500 border-green-500 hover:text-green-500 text-base mt-0 cursor-default">
								<Link to="/admin-createUser">+ ADD</Link>
							</ButtonComponent>
						</div>

						<Table data={slicedData} headers={userArray} handleUpdate={handleUpdate} handleDelete={handleDelete} />
						<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
					</div>
				)}
			</div>
		</>
	)
}

export default Index

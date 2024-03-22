import React, { useEffect, useState } from "react"
import { DeleteProductbyId, getProducts } from "../../../../utils/axios-instance"
import { useNavigate } from "react-router-dom"
import Table from "../../../common/Table"
import { useDispatch, useSelector } from "react-redux"
import Pagination from "../../../common/Pagination"
import ConfirmDeleteModal from "../../../common/ConfirmDeleteModal"
import Searching from "../../../common/Searching"
import Sorting from "../../../common/Sorting"
import ButtonComponent from "../../../common/ButtonComponent"
import Loader from "../../../common/Loader"
import {setLoader} from "../../../../redux/actions/appActions"
import {toast} from "react-toastify"

const YourProducts = () => {
	const [products, setProducts] = useState([])
	const navigate = useNavigate()
	const {
		seller: { productsToSell: sellerProducts },
	} = useSelector((state) => state.role)
	const { loader } = useSelector((state) => state.app)
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1)
	const [showConfirmationModal, setShowConfirmationModal] = useState(false)
	const [productIdToBeDeleted, setProductIdToBeDeleted] = useState(null)
	const [searchResults, setSearchResults] = useState([])
	const [sortingResult, setSortingResult] = useState([])

	const nPages = Math.ceil(products.length / 5)
	const indexOfLastRecord = currentPage * 5
	const indexOfFirstRecord = indexOfLastRecord - 5
	const slicedData = products.slice(indexOfFirstRecord, indexOfLastRecord)

	const handleUpdate = (productID) => {
		navigate(`/seller-update-products/${productID}`)
	}

	const productsArray = [
		{ key: "id", label: "ID" },
		{ key: "title", label: "Title" },
		{ key: "price", label: "Price" },
		{ key: "brand", label: "Brand" },
		{ key: "category", label: "Category" },
	]
	
	const handleDelete = async (productID) => {
		// console.log(productID);
		setProductIdToBeDeleted(productID)
		setShowConfirmationModal(true)
	}

	const deleteProduct = async (productID) => {
		try {
			dispatch(setLoader(true))
			const response = await DeleteProductbyId(productID)
			if (response.success) {
				setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productID))
				toast.success("Product deleted successfully")
			} else {
				console.error("Failed to delete the Products Data", response.error)
				toast.error("Problem deleting product, Please try after some time!")
			}
		} catch (error) {
			console.error("Failed to delete the Products Data", error)
		} finally {
			setShowConfirmationModal(false)
			setProductIdToBeDeleted(null)
			dispatch(setLoader(false))
		}
	}

	const fetchData = async () => {
		try {
			const response = await getProducts()
			if (response.success) {
				const productsToShow = response.data.filter((product) => {
					return sellerProducts.includes(product.id)
				})
				setProducts(productsToShow)
			} else {
				console.error("Failed to fetch the Products Data", response.error)
			}
		} catch (error) {
			console.error("Error while Fetching products", error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [sellerProducts])

	return (
		<>
			{
				loader && <Loader />
			}
			{showConfirmationModal && (
				<ConfirmDeleteModal
					Id={productIdToBeDeleted}
					handleDelete={deleteProduct}
					setShowConfirmationModal={setShowConfirmationModal}
					setDataIdToBeDeleted={setProductIdToBeDeleted}
				/>
			)}
			<div className="w-[min(90%,90vw)] m-auto text-center py-10">
				{products.length != 0 && (
					<>
						<h1 className="text-3xl mb-8 font-bold">Your Products</h1>
						<div className="w-full flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
							<div className="w-full md:w-3/4">
								<Searching
									dataToSearch={products}
									setSearchResults={setSearchResults}
									setCurrentPage={setCurrentPage}
								/>
							</div>

							<div className="w-full mt-2 md:mt-0 flex flex-row items-center justify-between md:flex-row">
								<Sorting setSortingResult={setSortingResult} searchResults={searchResults} />
								<ButtonComponent
									buttonStyle="ml-0 sm:ml-4 mt-0 py-[4px!important] md:py-[6px!important] bg-green-500 border-green-500 hover:text-green-500 text-sm cursor-pointer"
									handleClick={() => navigate("/seller-create-products")}>
									ADD PRODUCT
								</ButtonComponent>
							</div>
						</div>
					</>
				)}
				{sortingResult.length === 0 ? (
					<>
						<h2 className="text-3xl mt-5" >No Products Found!</h2>
						<ButtonComponent
							buttonStyle="ml-0 sm:ml-4 mt-4 py-[4px!important] md:py-[6px!important] bg-green-500 border-green-500 hover:text-green-500 text-sm cursor-pointer"
							handleClick={() => navigate("/seller-create-products")}>
							ADD NEW PRODUCT
						</ButtonComponent>
					</>
				) : (
					<>
						<Table
							data={sortingResult.slice(indexOfFirstRecord, indexOfLastRecord)}
							headers={productsArray}
							handleUpdate={handleUpdate}
							handleDelete={handleDelete}
						/>
						<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
					</>
				)}
			</div>
		</>
	)
}

export default YourProducts

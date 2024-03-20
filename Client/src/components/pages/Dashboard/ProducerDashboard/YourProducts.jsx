import React, { useEffect, useState } from "react"
import { DeleteProductbyId, getProducts } from "../../../../utils/axios-instance"
import { useNavigate } from "react-router-dom"
import Table from "../../../common/Table"
import { useSelector } from "react-redux"
import Pagination from "../../../common/Pagination"
import ConfirmDeleteModal from "../../../common/ConfirmDeleteModal"

const YourProducts = () => {
	const [products, setProducts] = useState([])
	const navigate = useNavigate()
	const {
		seller: { productsToSell: sellerProducts },
	} = useSelector((state) => state.role)
	const [currentPage, setCurrentPage] = useState(1)
	const [showConfirmationModal, setShowConfirmationModal] = useState(false)
	const [productIdToBeDeleted, setProductIdToBeDeleted] = useState(null)

	const nPages = Math.ceil(products.length / 5)
	const indexOfLastRecord = currentPage * 5
	const indexOfFirstRecord = indexOfLastRecord - 5
	const slicedData = products.slice(indexOfFirstRecord, indexOfLastRecord)

	const handleUpdate = (productID) => {
		navigate(`/seller-update-products/${productID}`)
	}

	const productArray = [
		{ key: 'id', label: 'ID' },
		{ key: 'title', label: 'title' },
		{ key: 'price', label: 'price' },
		{ key: 'brand', label: 'brand' },
		{ key: 'category', label: 'category' },
	]
	const handleDelete = async (productID) => {
		// console.log(productID);
		setProductIdToBeDeleted(productID)
		setShowConfirmationModal(true)
	}

	const deleteProduct = async (productID) => {
		try {
			const response = await DeleteProductbyId(productID)
			if (response.success) {
				setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productID))
			} else {
				console.error("Failed to delete the Products Data", response.error)
			}
		} catch (error) {
			console.error("Failed to delete the Products Data", error)
		} finally {
			setShowConfirmationModal(false)
			setProductIdToBeDeleted(null)
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
			{showConfirmationModal && (
				<ConfirmDeleteModal
					Id={productIdToBeDeleted}
					handleDelete={deleteProduct}
					setShowConfirmationModal={setShowConfirmationModal}
					setDataIdToBeDeleted={setProductIdToBeDeleted}
				/>
			)}
			<div className="text-center py-10 min-h-[90vh]">
				<h1 className="text-3xl mb-8 font-bold">Your Products</h1>
				<Table
					data={slicedData}
					headers={productArray }
					handleUpdate={handleUpdate}
					handleDelete={handleDelete}
				/>
				<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
			</div>
		</>
	)
}

export default YourProducts

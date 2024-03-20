import React from "react"

const ConfirmDeleteModal = ({ Id, handleDelete, setShowConfirmationModal, setDataIdToBeDeleted }) => {
	const cancelDelete = () => {
		setShowConfirmationModal(false)
		setDataIdToBeDeleted(null)
	}

	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-screen h-screen z-20 bg-[rgba(0,0,0,0.2)]">
			<div className="z-50 bg-slate-50 px-5 py-5 w-[min(90%,450px)] rounded-md relative">
				<button className="absolute top-3 right-3 text-xs" onClick={cancelDelete}>❌</button>
				<h2 className="text-2xl font-medium">Delete Confirmation</h2>
				<hr className="h-2 mt-3" />
				<p className="my-4 text-base bg-red-200 text-red-900 font-medium p-5  rounded-md">Are you sure you want to delete product with ID: {Id}</p>
				<div className="flex w-3/4 mx-auto justify-end gap-5">
					<button className="" onClick={cancelDelete}>
						cancel
					</button>
					<button className="" onClick={() => handleDelete(Id)}>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDeleteModal

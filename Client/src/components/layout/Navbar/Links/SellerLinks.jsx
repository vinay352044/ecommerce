import { FaUserAlt } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const SellerLinks = () => {
	return (
		<>
    <li>
				<NavLink
					to="/seller-products"
					className={({ isActive }) =>
						`${isActive ? "" : "text-white"} flex items-center gap-2 text-lg py-1 hover:text-black`
					}>
					Your Products
				</NavLink>
			</li>
    <li>
				<NavLink
					to="/seller-create-products"
					className={({ isActive }) =>
						`${isActive ? "" : "text-white"} flex items-center gap-2 text-lg py-1 hover:text-black`
					}>
					Add Product
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/seller/profile"
					className={({ isActive }) =>
						`${isActive ? "" : "text-white"} flex items-center gap-2 text-lg py-1 hover:text-black`
					}>
					<FaUserAlt />
					Profile
				</NavLink>
			</li>
		</>
	)
}

export default SellerLinks

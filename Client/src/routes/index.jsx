import React from "react"
import PrivateRoutesUser from "../utils/PrivateRoutes/PrivateRoutesUser/index.jsx"
import {createBrowserRouter} from "react-router-dom"
import UsersCart from "../components/pages/Home/UsersCart.jsx"
import Profile from "../components/pages/Profile/index.jsx"
import PrivateRoutesAdmin from "../utils/PrivateRoutes/PrivateRoutesAdmin/index.jsx"
import PrivateRoutesSeller from "../utils/PrivateRoutes/PrivateRoutesSeller/index.jsx"
import ProductViewDetais from "../components/pages/Home/ProductViewDetais.jsx"


// const About = React.lazy(() => import("../components/pages/About"))
const Layout = React.lazy(() => import("../components/layout/Layout"))
const Login = React.lazy(() => import("../components/pages/Login"))
const ErrorPage = React.lazy(() => import("../components/pages/ErrorPage"))
const Home = React.lazy(() => import("../components/pages/Home/Home"))
const Contact = React.lazy(() => import("../components/pages/Contact"))
const RegisterUser = React.lazy(() => import("../components/pages/Register/register-user"));
const RegisterSeller = React.lazy(() => import("../components/pages/Register/register-seller"));
const Admin = React.lazy(() => import("../components/pages/Dashboard/AdminDashboard/index"));
const AdminUsers = React.lazy(() => import("../components/pages/Dashboard/AdminDashboard/AdminUsers/index"));
const AdminProducts = React.lazy(() => import("../components/pages/Register/register-product/index"));
const Wishlist = React.lazy(()=> import("../components/pages/Wishlist/Wishlist.jsx"))


export const Router = () => {
	return createBrowserRouter([
		{
			element: <Layout />,
			children: [
				{
					path: '/',
					element: <Home />
				},
				{
					path: '/contact',
					element: <Contact />
				},
				{
					element: <PrivateRoutesUser/>,
					children: [
						// protected routes for user should be declared here
						{
							path: 'wishlist',
							element: <Wishlist />
						},
						{
							path:'cart',
							element: <UsersCart/>
						},
						{
							path:'profile',
							element: <Profile/>
						}
					]
				},
				{
					element: <PrivateRoutesAdmin/>,
					children: [
						// protected routes for admin should be declared here
						{
							path: 'admin',
							element: <Admin />
						},
						{
							path: 'admin/users',
							element: <AdminUsers />
						},
						{
							path: 'admin/create-products',
							element: <AdminProducts/>
						}
					]
				},
				{
					element: <PrivateRoutesSeller/>,
					children: [
						// protected routes for seller should be declared here
						{
							path: 'admin',
							element: <Admin />
						},
						{
							path: 'admin/users',
							element: <AdminUsers />
						},
						{
							path: 'admin/create-products',
							element: <AdminProducts/>
						}
					]
				},
				{
					path: 'login',
					element: <Login />
				},
				{
					path: 'register',
					element: <RegisterUser />
				},
				{
					path: 'buisness/register',
					element: <RegisterSeller />
				}
			]
		},
		{
			path: '*',
			element: <ErrorPage/>
		}
	])
}

// export const Router = (isAuthenticated = false) => {
// 	return createBrowserRouter(
// 		createRoutesFromElements(
// 			<Route>
// 				<Route element={<Layout />}>
// 					<Route index element={<Home />} />
// 					<Route element={<PrivateRoutesCheck isAuthenticated={isAuthenticated} />}>
// 						<Route path="dashboard" element={<Dashboard />}>
// 							<Route path="nested" element={<Nested />} />
// 						</Route>
// 						<Route path="about" element={<About />} />
// 					</Route>
// 					<Route path="*" element={<ErrorPage />} />
// 				</Route>
// 				<Route path="login" element={<Login />} />
// 				<Route path="register" element={<Register />} />
// 			</Route>
// 		)
// 	)
// }

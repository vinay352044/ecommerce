import React from "react"
import PrivateRoutesCheck from "../utils/PrivateRoutesCheck"
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import UsersCart from "../components/pages/Home/UsersCart.jsx"


const About = React.lazy(() => import("../components/pages/About"))
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


export const Router = (isAuthenticated = false) => {
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
					element: <PrivateRoutesCheck isAuthenticated={isAuthenticated} />,
					children: [
						// protected routes should be declared here
						{
							path: 'admin',
							element: <Admin />
						},
						{
							path: 'admin/users',
							element: <AdminUsers />
						},
						{
							path:'cart',
							element: <UsersCart/>
						}
						// {
						// 	path: 'dashboard',
						// 	element: <Dashboard />,
						// 	children: [{
						// 		path: 'nested',
						// 		element: <Nested />
						// 	}]
						// },
						// {
						// 	path: 'about',
						// 	element: <About />
						// }
					]
				},
				{
					path: 'about',
					element: <About />
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
			path: 'admin/create-products',
			element: <AdminProducts/>
		},
		{
			path: 'admin/create-products',
			element: <AdminProducts/>
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

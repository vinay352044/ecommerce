import React from "react"
import PrivateRoutesCheck from "../utils/PrivateRoutesCheck"
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import UpdateUsers from "../components/pages/Register/register-user/updateuser"

const Layout = React.lazy(() => import("../components/layout/Layout"))
const Login = React.lazy(() => import("../components/pages/Login"))
const ErrorPage = React.lazy(() => import("../components/pages/ErrorPage"))
const Home = React.lazy(() => import("../components/pages/Home/Home"))
const RegisterUser = React.lazy(() => import("../components/pages/Register/register-user"));
const Admin = React.lazy(() => import("../components/pages/Dashboard/AdminDashboard/index"));
const AdminUsers = React.lazy(() => import("../components/pages/Dashboard/AdminDashboard/AdminUsers/index"));

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
					element: <PrivateRoutesCheck isAuthenticated={isAuthenticated} />,
					children: [
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
			path: 'admin/createUser',
			element: <RegisterUser />
		},
		{
			path: 'admin/update/:id',
			element: <UpdateUsers />
		},
		{
			path: 'admin',
			element: <Admin />
		},
		{
			path: 'admin/users',
			element: <AdminUsers />
		},
		{
			path: '*',
			element: <ErrorPage />
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

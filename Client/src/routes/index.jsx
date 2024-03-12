import React from "react"
import PrivateRoutesCheck from "../utils/PrivateRoutesCheck"
import {createBrowserRouter} from "react-router-dom"


const About = React.lazy(() => import("../components/pages/About"))
const Layout = React.lazy(() => import("../components/layout/Layout"))
const Login = React.lazy(() => import("../components/pages/Login"))
const ErrorPage = React.lazy(() => import("../components/pages/ErrorPage"))
const Home = React.lazy(() => import("../components/pages/Home/Home"))
const RegisterUser = React.lazy(() => import("../components/pages/Register/register-user"));
const RegisterSeller = React.lazy(() => import("../components/pages/Register/register-seller"));
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
						// protected routes should be declared here
						{
							path: 'admin',
							element: <Admin />
						},
						{
							path: 'admin/users',
							element: <AdminUsers />
						},
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

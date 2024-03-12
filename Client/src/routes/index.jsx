import React from "react"
import PrivateRoutesCheck from "../utils/PrivateRoutesCheck"
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

const Layout = React.lazy(() => import("../components/layout/Layout"))
const Login = React.lazy(() => import("../components/pages/Login"))
const ErrorPage = React.lazy(() => import("../components/pages/ErrorPage"))
const Home = React.lazy(() => import("../components/pages/Home/Home"))
const RegisterUser = React.lazy(() => import("../components/pages/Register/register-user"));
const RegisterSeller = React.lazy(() => import("../components/pages/Register/register-seller"));

export const Router = (isAuthenticated = false) => {
	return createBrowserRouter([
		{
			element: <Layout/>,
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
				},
				{
					path: '*',
					element: <ErrorPage />
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
			path: '/buisness/register',
			element: <RegisterSeller />
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

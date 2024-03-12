import { Suspense, useState } from "react"
import "./App.css"
import { RouterProvider } from "react-router-dom"
import { Router } from "./routes"
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true)
	const router = Router(isAuthenticated)

	return (
		<>
			<Suspense fallback={<h1>Page is Loading...</h1>}>
				<ToastContainer autoClose={2000} closeOnClick pauseOnFocusLoss={false} pauseOnHover transition={Bounce} />
				<RouterProvider router={router} />
			</Suspense>
		</>
	)
}

export default App

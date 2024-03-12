import React from "react"
import "./home.css"
import ProductCard from "./FetchData"

const Home = () => {
	return (
		<div className="home">
			<h1 className="text-3xl">Home</h1>
			<ProductCard/>
		</div>
	)
}

export default Home

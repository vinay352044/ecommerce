const ButtonComponent = ({ buttonStyle="", handleClick, children, type = "button", ...props }) => {
	const buttonClass = "bg-[#0295db!important] outline-none hover:bg-[white!important] mt-4 px-5 py-2 rounded-md text-white hover:text-[#0295db!important] border-2 border-[#0295db!important] transition-all duration-250 ease-in-out font-semibold " + buttonStyle

	return (
		<button type={type} className={buttonClass} onClick={handleClick} {...props}>
			{children}
		</button>
	)
}

export default ButtonComponent

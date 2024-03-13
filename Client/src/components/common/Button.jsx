const Button = ({className , handleClick, children}) => {
  return (
    <button className={`${className} py-2 px-4 border-[2px] border-black`} onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button

/* eslint-disable react/prop-types */
const Button = ({buttonText , className , handleClick}) => {
  return (
    <button className={className} onClick={handleClick}>
      {buttonText}
    </button>
  )
}

export default Button

/* eslint-disable react/prop-types */
const Button = ({buttonName , className}) => {
  return (
    <button className={className}>
      {buttonName}
    </button>
  )
}

export default Button

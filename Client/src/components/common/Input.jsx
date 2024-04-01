const Input = ({
  id,
  name,
  type = "text",
  value,
  placeholder,
  className = "",
  onChange,
  onBlur,
  autocomplete,
  readOnly,
  autoFocus,
  ...props //like for required
}) => {
  const defaultStyle =
    "border-2 border-gray-400 outline-0 rounded-md mt-1 px-2 py-1 h-11 w-[min(24rem,85vw)] focus:border-black " +
    className;

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      className={defaultStyle}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autocomplete}
      readOnly={readOnly}
      autoFocus={autoFocus}
      {...props}
    />
  );
};

export default Input;

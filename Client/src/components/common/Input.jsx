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
    "border-2 border-black rounded-md focus:ring-0 w-[min(24rem,85vw)] " + className;

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

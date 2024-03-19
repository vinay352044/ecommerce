import React, { useState } from "react";

const Input = ({
  id,
  name,
  type,
  value,
  placeholder,
  className,
  onChange,
  onBlur,
  autocomplete,
  readOnly,
  autoFocus,
  ...props
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      className={`${
        className ? className : "border-2 border-black rounded-md focus:ring-0"
      }`}
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

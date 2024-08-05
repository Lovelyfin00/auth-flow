import React, { useState } from "react";

import {BiErrorCircle, BiHide, BiShow} from "react-icons/bi";

const TextInput = ({
  type,
  name,
  labelText,
  hasLabel,
  placeholder,
  inputError,
  handleChange,
  inputStyle,
  inputValue,
  saveInputValue,
  readonly=false
}) => {
  const inputChange = event => {
    let value = event.target.value;
    if (handleChange !== undefined) {
      if (value.length > 0) {
        handleChange(false);
        if (saveInputValue) {
          saveInputValue(event);
        }
      } else {
        handleChange(true);
      }
    } else {
      if (labelText === "Phone Number") {
        value = value.replace(/[^0-9+ -]/g, "");
      }
      saveInputValue(event);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility =() =>{
    setShowPassword(!showPassword);
  }

  return (
    <div className="w-full">
      {hasLabel && (
        <label
          htmlFor={type}
          className="block text-gray-700 mb-2 text-[0.875rem] font-[500]">
          {labelText}
        </label>
      )}
      <div className="relative">
      <input
        type={showPassword ? "text" : type}
        name={name || ""}
        id={type}
        onChange={event => inputChange(event)}
        value={inputValue}
        readOnly={readonly}
        placeholder={placeholder}
        className={`font-medium border border-grey-300 bg-white w-[100%] py-3 rounded-8px text-[1rem] ${
          !inputStyle ? "pl-3" : inputStyle
        } pr-4 focus:bg-white focus:outline-none focus:border-primary-blue-30 focus:ring-2 focus:shadow-lg focus:ring-[#F4EBFF]`}
      />
      {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
          </button>
        )}
      </div>
      {inputError && (
        <p className="flex items-center mt-2 text-sm text-red-700">
          <BiErrorCircle className="mr-2 text-xl" />
          {inputError}
        </p>
      )}
    </div>
  );
};

export default TextInput;
import { useState } from "react";

const InputBox = ({ label, type = "text", name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full mt-8">
      <input
        type={type}
        name={name}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
        className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 text-white
         placeholder-transparent focus:border-white focus:outline-none
         appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
         "
        placeholder={label}
      />
      <label
        className={`
          absolute left-1 text-gray-400 transition-all duration-200
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
          peer-focus:top-0 peer-focus:text-sm peer-focus:text-white
          ${value && !isFocused ? "top-0 text-sm text-white" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default InputBox;

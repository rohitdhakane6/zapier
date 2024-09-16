import React from "react";

interface InputProps {
  id?: string;
  type?: string; // Default to text, but can be overridden (e.g., password, email)
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  required = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col  ${className}`}>
      {label && (
        <label htmlFor={id} className="block mb-2 text-lg font-medium">
          {required && "* "} 
          <span className="capitalize">{label}</span> {required && "(Required)"}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 px-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;

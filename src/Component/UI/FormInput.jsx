import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col gap-1 p-2 w-full font-montserat">
    <label className="text-white font-bold text-sm">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`outline-0 w-full p-2 bg-white rounded-md border-2 ${
        error ? "border-red-400" : "border-transparent"
      }`}
    />
    {error && (
      <p className="text-red-200 text-xs mt-1 font-semibold">{error}</p>
    )}
  </div>
);

export default FormInput;

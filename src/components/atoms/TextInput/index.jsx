import React from "react";
import "../../../assets/main.css";

const TextInput = ({ type, title, placeholder }) => {
  return (
    <div className="col-span-7 md:col-span-6">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full md:text-md border border-gray-300 rounded-md h-8"
      />
    </div>
  );
};

export default TextInput;

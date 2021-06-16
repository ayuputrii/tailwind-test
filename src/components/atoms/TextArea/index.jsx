import React from "react";
import "../../../assets/main.css";

const TextArea = ({ nameTextArea, placeholderTextArea, ...register }) => {
  return (
    <div className="col-span-6">
      <label className="block text-sm font-medium text-gray-700">
        {nameTextArea}
      </label>
      <textarea
        rows={3}
        placeholder={placeholderTextArea}
        {...register}
        className="mt-1 px-2 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full md:text-md border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TextArea;

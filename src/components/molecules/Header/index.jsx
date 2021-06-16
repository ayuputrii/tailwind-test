import React from "react";
import "../../../assets/main.css";

const Header = ({ nameHeader }) => {
  return (
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900">{nameHeader}</h1>
    </div>
  );
};

export default Header;

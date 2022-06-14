import React, { Children } from "react";
import { useDropdown } from "./dropdown-context";

const Option = ({ children, onClick }) => {
  const { setDropdown } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    console.log(1);
    setDropdown(false);
  };
  return (
    <>
      <li
        onClick={handleClick}
        className={`p-4 border-b border-white cursor-pointer transition-all bg-[#e7ecf3] hover:bg-[#fff]`}
      >
        {children}
      </li>
    </>
  );
};

export default Option;

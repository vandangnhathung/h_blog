import React from "react";
import Dropdown from "./Dropdown";
import { useDropdown } from "./dropdown-context";

const SelectYourCategory = ({ placeholder = "" }) => {
  const { toggle } = useDropdown();
  return (
    <div
      className="border rounded-lg bg-[#e7ecf3]  p-4 cursor-pointer flex justify-between items-center"
      onClick={toggle}
    >
      <span>{placeholder}</span>
      <Dropdown.IconCheck></Dropdown.IconCheck>
    </div>
  );
};

export default SelectYourCategory;

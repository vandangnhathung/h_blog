import React from "react";
import Dropdown from "./Dropdown";
import { useDropdown } from "./dropdown-context";

const SelectYourCategory = ({ type = "default", placeholder = "" }) => {
  const { toggle } = useDropdown();
  return (
    <div
      className={`border rounded-md px-5 py-4 cursor-pointer flex justify-between items-center text-black ${
        type === "default" && "bg-[#e7ecf3]"
      } ${type === "managePost" && "text-lg gap-10 font-medium"}`}
      onClick={toggle}
    >
      <span>{placeholder}</span>
      <Dropdown.IconCheck></Dropdown.IconCheck>
    </div>
  );
};

export default SelectYourCategory;

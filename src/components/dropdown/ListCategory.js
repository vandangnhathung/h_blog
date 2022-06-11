import React from "react";
import { useDropdown } from "./dropdown-context";

const ListCategory = ({ children }) => {
  const { dropdown } = useDropdown();
  return (
    <>
      {dropdown && (
        <ul className="w-full z-10 absolute rounded-lg border overflow-hidden transition-all">
          {children}
        </ul>
      )}
    </>
  );
};

export default ListCategory;

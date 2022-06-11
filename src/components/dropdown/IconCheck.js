import React from "react";
import { useDropdown } from "./dropdown-context";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const IconCheck = () => {
  const { dropdown } = useDropdown();
  return (
    <>
      {dropdown ? (
        <TiArrowSortedUp></TiArrowSortedUp>
      ) : (
        <TiArrowSortedDown className=""></TiArrowSortedDown>
      )}
    </>
  );
};

export default IconCheck;

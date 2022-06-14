import React from "react";

const StatusStyles = (props) => {
  const { type } = props;
  let stylesStatusDefault =
    "p-2 rounded-lg font-semibold text-center capitalize";
  let stylesStatus = "";
  switch (type) {
    case 1:
      stylesStatus = "bg-green-100 text-green-400   ";
      break;
    case 2:
      stylesStatus = "bg-red-100 text-red-400   ";
      break;

    default:
      break;
  }
  return (
    <div className={`${stylesStatus} ${stylesStatusDefault}`}>
      {type === 1 ? "Approved" : "Unapproved"}
    </div>
  );
};

export default StatusStyles;

import React, { useEffect } from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, control, children, name, ...rest }) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden-input "
        {...field}
        {...rest}
      />
      <div className="flex gap-x-2 items-center cursor-pointer">
        <div
          className={`w-7 h-7 cursor-pointe rounded-full cursor-pointer text-white flex items-center justify-center ${
            checked ? `bg-green-400 border-0` : `bg-white border`
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>{" "}
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;

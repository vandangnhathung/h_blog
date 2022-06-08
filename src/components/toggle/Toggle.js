import React from "react";

const Toggle = ({ on, onClick, ...props }) => {
  return (
    <label className="inline-block  w-[70px] h-[30px]">
      <input
        type="checkbox"
        checked={on}
        className="hidden-input"
        onChange={() => {}}
        onClick={onClick}
      />
      <div
        className={`inline-block w-[70px] h-[30px] p-1 transition-all rounded-full cursor-pointer ${
          on ? "bg-green-400" : "bg-[#e7ecf3]"
        }`}
      >
        <div
          className={`w-[22px] h-[22px] bg-white rounded-full  transition-all ${
            on ? "translate-x-[40px]" : "translate-x-[0px]"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;

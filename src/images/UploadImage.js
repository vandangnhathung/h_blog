import React from "react";
import dog from "../images/dog.png";
const UploadImage = ({
  progress = 0,
  imageAPI = "",
  handleDeleteImage = () => {},
  ...props
}) => {
  return (
    <label className="min-h-[300px] bg-slate-200 border  border-dashed rounded-lg flex items-center justify-center cursor-pointer relative label-image z-0 transition-all group">
      <input
        type="file"
        className="hidden-input"
        onChange={() => {}}
        {...props}
      />
      {!imageAPI && progress === 0 && (
        <div className="flex flex-col items-center text-center ">
          <img src={dog} alt="" className="max-w-[80px] rounded-lg mb-5" />
          <p className="font-semibold">Choose a photo</p>
        </div>
      )}
      {imageAPI && (
        <div className="">
          <img
            src={imageAPI}
            alt=""
            className="w-full h-full rounded-lg object-cover"
          />
          <button
            type="button"
            className="p-4 rounded-full bg-white text-red-500 absolute invisible right-2 bottom-2 z-10 opacity-0 transition-all group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
      {!imageAPI && (
        <div
          className="absolute bg-green-400 bottom-0 left-0 h-1 w-10 transition-all"
          style={{ width: `${Math.ceil(progress)}%` }}
        ></div>
      )}

      {!imageAPI && progress !== 0 && (
        <div className="w-10 h-10 animate-spin border-4 transition-all border-green-400 rounded-full border-b-transparent absolute"></div>
      )}
    </label>
  );
};

export default UploadImage;

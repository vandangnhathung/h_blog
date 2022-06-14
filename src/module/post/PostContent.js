import React from "react";

const PostContent = ({ ...props }) => {
  const { imageAPI, title, createdAt } = props;
  return (
    <div className="flex gap-x-2 items-center justify-center">
      <img
        src={imageAPI}
        alt=""
        className="w-32 h-16 object-cover rounded-lg"
      />
      <div className="text-left">
        <h3 className="font-bold text-base">{title}</h3>
        <p className="text-[#888]">Date: {createdAt.seconds}</p>
      </div>
    </div>
  );
};

export default PostContent;

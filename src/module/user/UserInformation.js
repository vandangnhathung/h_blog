import React from "react";

const UserInfomation = ({ ...props }) => {
  const { avatar, createdAt, username } = props;
  return (
    <div className="flex gap-x-2 items-center justify-center">
      <img src={avatar} alt="" className="w-10 h-10 object-cover rounded-lg" />
      <div className="text-left">
        <h3 className="font-bold text-base">{username}</h3>
        <p className="text-[#888]">
          {new Date(createdAt.seconds * 1000).toLocaleDateString("vi-VI")}
        </p>
      </div>
    </div>
  );
};

export default UserInfomation;

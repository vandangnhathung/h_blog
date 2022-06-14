import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BsBox, BsBook } from "react-icons/bs";
import { GoArchive } from "react-icons/go";
import { RiUser5Line } from "react-icons/ri";
import { useActiveDashboard } from "../../contexts/activeItemDashboardContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-folder/firebase-config";

const DashboardItemStyles = styled.ul`
  margin-top: 15px;

  .dashboard {
    &-item {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      display: flex;
      align-items: center;
      gap: 15px;
      font-weight: 600;
      color: #919191;
      padding: 20px;
      transition: all 0.1s linear;
      &:hover {
        color: rgb(14, 171, 173);
        background-color: rgba(14, 171, 173, 0.1);
      }
    }

    &-icon {
      font-size: 18px;
    }
    &-name {
    }
  }
  .active {
    color: rgb(14, 171, 173);
    background-color: rgba(14, 171, 173, 0.1);
  }
`;
const DashboardItem = () => {
  const { deleteActive, handleActive, setDeleteActive } = useActiveDashboard();
  const active = useRef();
  const dashboardItem = [
    {
      to: "/dashboard",
      name: "Dashboard",
      icon: <BsBox className="dashboard-icon"></BsBox>,
    },
    {
      to: "/manage/post",
      name: "Post",
      icon: <BsBook></BsBook>,
    },
    {
      to: "/manage/category",
      name: "Category",
      icon: <GoArchive></GoArchive>,
    },
    {
      to: "/manage/user",
      name: "User",
      icon: <RiUser5Line></RiUser5Line>,
    },
    {
      to: "",
      name: "Logout",
      onClick: () => signOut(auth),
    },
  ];
  // console.log(deleteActive);
  useEffect(() => {
    if (deleteActive === true) {
      const deleteItemActive = document.querySelectorAll(".active");

      deleteItemActive.forEach((item) => item.classList?.remove("active"));
      console.log(deleteItemActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteActive]);
  return (
    <DashboardItemStyles>
      {dashboardItem.map((item) => {
        if (item.name === "Dashboard") {
          return (
            <NavLink to={item.to} key={item.name} onClick={handleActive}>
              <li
                className="dashboard-item active"
                ref={active}
                onClick={() => {
                  setDeleteActive(false);
                }}
              >
                {item.icon}
                <span className="dashboard-name">{item.name}</span>
              </li>
            </NavLink>
          );
        } else if (item.onClick) {
          return (
            <NavLink to={item.to} key={item.name} onClick={item.onClick}>
              <li
                className="dashboard-item"
                ref={active}
                onClick={() => {
                  setDeleteActive(false);
                }}
              >
                {item.icon}
                <span className="dashboard-name">{item.name}</span>
              </li>
            </NavLink>
          );
        } else {
          return (
            <NavLink to={item.to} key={item.name} onClick={handleActive}>
              <li
                ref={active}
                className="dashboard-item"
                onClick={() => {
                  setDeleteActive(false);
                }}
              >
                {item.icon}
                <span className="dashboard-name">{item.name}</span>
              </li>
            </NavLink>
          );
        }
      })}
    </DashboardItemStyles>
  );
};

export default DashboardItem;

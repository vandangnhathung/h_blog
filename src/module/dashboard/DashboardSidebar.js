import React, { Children } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logo.jpg";

const DashboardSidebarStyles = styled.div`
  padding: 20px 0 20px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;
  max-height: 450px;
  .dashboard {
    &-logo {
      display: flex;
      align-items: center;
      gap: 15px;
      cursor: pointer;
    }
  }
  .logo {
    width: 43px;
    height: 56px;
    &-name {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;
const DashboardSidebar = ({ children }) => {
  return (
    <DashboardSidebarStyles>
      <NavLink to={"/"} className="dashboard-logo">
        <img src={logo} alt="" className="logo" />
        <span className="logo-name">Monkey Blogging</span>
      </NavLink>
      {children}
    </DashboardSidebarStyles>
  );
};

export default DashboardSidebar;

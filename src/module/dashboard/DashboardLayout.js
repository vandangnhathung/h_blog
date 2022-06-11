import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardItem from "./DashboardItem";
import { ActiveDashboardProvider } from "../../contexts/activeItemDashboardContext";
import Error404Page from "../../pages/Error404Page";
import { useAuth } from "../../contexts/auth-context";
const DashboardLayoutStyles = styled.div`
  font-family: "Montserrat", sans-serif;

  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 0;
      gap: 50px;
    }
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <Error404Page></Error404Page>;
  return (
    <ActiveDashboardProvider>
      <DashboardLayoutStyles>
        <DashboardHeader></DashboardHeader>
        <div className="container dashboard-main">
          <DashboardSidebar>
            <DashboardItem></DashboardItem>
          </DashboardSidebar>
          <Outlet></Outlet>
        </div>
      </DashboardLayoutStyles>
    </ActiveDashboardProvider>
  );
};

export default DashboardLayout;

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
  font-family: "Epilogue", sans-serif;
  max-width: 1600px;
  margin: 0 auto;

  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 30px;
    }
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  if (!userInfo) return <Error404Page></Error404Page>;
  return (
    <ActiveDashboardProvider>
      <DashboardLayoutStyles>
        <DashboardHeader></DashboardHeader>
        <div className="dashboard-main">
          <DashboardSidebar>
            <DashboardItem></DashboardItem>
          </DashboardSidebar>
          <div className="dashboard-right">
            <Outlet></Outlet>
          </div>
        </div>
      </DashboardLayoutStyles>
    </ActiveDashboardProvider>
  );
};

export default DashboardLayout;

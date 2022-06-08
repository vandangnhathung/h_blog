import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { useActiveDashboard } from "../../contexts/activeItemDashboardContext";

const DashboardHeaderStyles = styled.div`
  .dashboard {
    &-header {
      padding: 20px;
      background-color: white;
      border-bottom: 1px solid rgba(155, 153, 161, 0.5);
    }

    &-header__right {
      display: flex;
      gap: 40px;
      justify-content: flex-end;
      align-items: center;
    }
    &-user {
      width: 52px;
      height: 52px;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 100rem;
        object-fit: cover;
      }
    }
  }
`;

const DashboardHeader = () => {
  const { setDeleteActive } = useActiveDashboard();

  return (
    <DashboardHeaderStyles>
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header__right">
            <Button
              to={"/manage/add-post"}
              style={{ margin: "0", padding: "0 10px" }}
              className="!max-w-[250px]"
              height="52px"
              onClick={() => {
                setDeleteActive(true);
              }}
            >
              Write new post
            </Button>
            <div className="dashboard-user">
              <img
                src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1686&q=80"
                alt=""
              />
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;

import React, { Children } from "react";
import styled from "styled-components";

const DashboardHeadingStyles = styled.h1`
  font-size: 40px;
  line-height: calc(60px / 40px);
  font-weight: 600;
  color: #2a9da5;
  margin-bottom: 35px;
`;
const DashboardHeading = ({ children }) => {
  return <DashboardHeadingStyles>{children}</DashboardHeadingStyles>;
};

export default DashboardHeading;

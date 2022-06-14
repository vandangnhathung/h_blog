import React, { Children } from "react";
import styled from "styled-components";

const DashboardHeadingStyles = styled.h1`
  font-size: 30px;
  line-height: calc(40px / 30px);
  font-weight: 600;
  color: #2a9da5;
  margin-bottom: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DashboardHeading = ({ children, ...props }) => {
  const { title, desc } = props;
  return (
    <DashboardHeadingStyles>
      <div className="">
        <h1>{title}</h1>
        <p className="text-lg text-[#a6a4a4]">{desc}</p>
      </div>
      <div className="">{children}</div>
    </DashboardHeadingStyles>
  );
};

export default DashboardHeading;

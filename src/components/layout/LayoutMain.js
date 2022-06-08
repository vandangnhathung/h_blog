import React, { Children } from "react";
import styled from "styled-components";
const LayoutMainStyles = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
const LayoutMain = ({ children }) => {
  return <LayoutMainStyles>{children}</LayoutMainStyles>;
};

export default LayoutMain;

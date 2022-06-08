import React from "react";
import styled from "styled-components";

const HeadingStyles = styled.h3`
  position: relative;
  display: inline-block;
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  line-height: calc(36px / 28px);
  font-weight: 600;
  color: ${(props) => props.theme.tertiary};
  margin-bottom: 25px;
  &:after {
    content: "";
    position: absolute;
    width: 35%;
    height: 2px;
    left: 0;
    top: 0;
    background-color: #00d1ed;
  }
`;
const Heading = ({ children }) => {
  return <HeadingStyles>{children}</HeadingStyles>;
};

export default Heading;

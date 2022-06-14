import React, { Children } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const CategoryStyled = styled.span`
  padding: 4px 10px;
  background-color: ${(props) =>
    props.type === "secondary" ? "white" : "#f3edff"};
  color: #6b6b6b;
  border-radius: 10px;
  cursor: pointer;
`;
const Category = ({ children, to = "/", ...props }) => {
  const { type } = props;
  return (
    <NavLink to={to}>
      <CategoryStyled type={type}>{children}</CategoryStyled>
    </NavLink>
  );
};

export default Category;

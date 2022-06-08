import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Loading from "../loading/Loading";
const ButtonStyles = styled.button`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  height: ${(props) => props.height || "66px"};
  padding: 22px 0;
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  line-height: calc(36 / 24);
  ${(props) =>
    props.bg === "primary" &&
    css`
      background-image: linear-gradient(to right, #00a7b4, #a4d96c);
    `}
  ${(props) =>
    props.bg === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
      max-width: 250px;
      padding: 10px 25px;
    `}
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* margin: 0 auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

const Button = ({ type = "submit", children, bg = "primary", ...props }) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className="text-decoration banner-nav__styles">
        <ButtonStyles bg={bg} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles bg={bg} type={type} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;

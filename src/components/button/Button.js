import React from "react";
import styled from "styled-components";
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
  background-image: linear-gradient(to right, #00a7b4, #a4d96c);
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
const Button = ({ type = "button", children, ...props }) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <ButtonStyles type={type} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;

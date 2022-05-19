import React from "react";
import styled from "styled-components";
const ButtonStyles = styled.button`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
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
`;
const Button = ({ type, children, ...props }) => {
  return (
    <ButtonStyles type={type} {...props}>
      {children}
    </ButtonStyles>
  );
};

export default Button;

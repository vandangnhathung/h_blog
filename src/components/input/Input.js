import React from "react";
import styled from "styled-components";

const InputStyles = styled.div`
  width: 100%;
  height: 80px;
`;
const Input1 = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #999999;
  border-radius: 4px;
  background-color: ${(prop) => prop.theme.grayLight};
  transition: all 0.2s linear;
  margin-top: 5px;
  &:focus {
    background-color: #fff;
    border: 1px ${(prop) => prop.theme.primary} solid;
  }
`;
const Input = ({ name, type, children, ...props }) => {
  return (
    <InputStyles>
      <Input1 id={name} type={type} {...props} />
    </InputStyles>
  );
};

export default Input;

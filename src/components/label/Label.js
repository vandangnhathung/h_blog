import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  margin-bottom: 10px;
  display: inline-block;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;

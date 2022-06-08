import React from "react";
import styled from "styled-components";
const FieldCheckBoxAndRadioStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const FieldCheckBoxAndRadio = ({ children }) => {
  return <FieldCheckBoxAndRadioStyles>{children}</FieldCheckBoxAndRadioStyles>;
};

export default FieldCheckBoxAndRadio;

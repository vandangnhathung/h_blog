import React from "react";
import styled from "styled-components";

const FieldStyles = styled.div`
  margin-bottom: 30px;
`;

const Field = ({ children }) => {
  return <FieldStyles>{children}</FieldStyles>;
};

export default Field;

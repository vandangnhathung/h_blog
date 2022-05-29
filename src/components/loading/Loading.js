import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
const LoadingStyles = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid white;
  border-radius: 100%;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    30% {
      transform: rotate(360deg);
    }
  }
`;
const Loading = () => {
  return <LoadingStyles></LoadingStyles>;
};

export default Loading;

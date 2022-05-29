import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyles = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "15px 40px 15px 15px" : "15px")};
    border: 1px solid #999999;
    border-radius: 4px;
    background-color: ${(prop) => prop.theme.grayLight};
    transition: all 0.2s linear;
    &:focus {
      background-color: #fff;
      border: 1px ${(prop) => prop.theme.primary} solid;
    }
  }
  .icon__eyes {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 50%;
    transform: translateY(-40%);
    cursor: pointer;
  }
  .checked__icon {
    color: #84ca4b;
    font-size: 30px;
    background-color: white;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
    visibility: hidden;
    position: absolute;
  }
  .closed__icon {
    color: red;
    font-size: 30px;
    background-color: white;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s ease;
    visibility: hidden;
  }
  .input__check__icon {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translateY(-50%);
  }
  .input__email.valid + .input__check__icon .checked__icon {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  .input__email.invalid + .input__check__icon .closed__icon {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
`;

const Input = ({ name, type = "text", control, children, ...props }) => {
  const { field } = useController({ control, name, defaultValue: "" });
  //check icon regex
  // const inputEmail = document.querySelector(".input__email");
  // useEffect(() => {
  //   if (inputEmail) {
  //     inputEmail.addEventListener("input", function (e) {
  //       const value = e.target.value;
  //       const regexEmail =
  //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //       if (regexEmail.test(value.trim())) {
  //         inputEmail.classList.add("valid");
  //         inputEmail.classList.remove("invalid");
  //         // console.log("check");
  //       } else {
  //         inputEmail.classList.remove("valid");
  //         inputEmail.classList.add("invalid");
  //       }
  //       if (!value) {
  //         inputEmail.classList.remove("invalid");
  //       }
  //     });
  //   }
  // }, [inputEmail]);
  //

  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyles>
  );
};

export default Input;

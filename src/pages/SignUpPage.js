import React from "react";
import logo from "../images/logo.jpg";
import styled from "styled-components";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { AuthProvider } from "../contexts/auth-context";

const SignUpPageStyle = styled.div`
  margin-top: 115px;

  .logo {
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    &__img {
      max-width: 121px;
      width: 100%;
      object-fit: cover;
      height: 156px;
    }
    &__text {
      font-weight: 600;
      font-size: 40px;
      line-height: calc(60 / 40);
      color: #2ebac1;
    }
  }
  .form {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
  .field {
    margin-top: 107px;
  }
`;
const SignUpPage = () => {
  return (
    <SignUpPageStyle>
      <div className="container">
        <div className="logo">
          <div className="logo__wrapper">
            <img src={logo} alt="" className="logo__img" />
            <p className="logo__text">Hung Blogging</p>
          </div>
          <form className="form">
            <div className="field">
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
              ></Input>
            </div>
            <Button typed="submit">Sign Up</Button>
          </form>
        </div>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;

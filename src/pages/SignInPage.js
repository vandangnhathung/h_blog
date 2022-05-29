import React, { useEffect, useState } from "react";
import logo from "../images/logo.jpg";
import styled from "styled-components";
import Label from "../components/label/Label";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import { AuthProvider, useAuth } from "../contexts/auth-context";
import { useForm } from "react-hook-form";
import Field from "../components/field/Field";
import IconEyesOpen from "../icon/IconEyesOpen";
import IconEyesClose from "../icon/IconEyesClose";
import Loading from "../components/loading/Loading";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-folder/firebase-config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
const SignInPageStyle = styled.div`
  margin-top: 30px;

  .logo {
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
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
  .had__account {
    margin-bottom: 25px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
    }
  }
`;

const schemaValidation = yup.object({
  email: yup
    .string()
    .email("Vui lòng điền email có sẵn vào chỗ trống.")
    // Bạn sẽ sử dụng thông tin này khi đăng nhập và khi cần đặt lại mật khẩu.
    .required("Vui lòng điền email của bạn vào chỗ trống."),
  password: yup
    .string()
    .min(6, "Cần điền ít nhất 6 ký tự")
    .matches(/[A-Z]/, "Bạn cần phải có ít nhất 1 ký tự in hoa")
    .matches(/[a-z]/, "Bạn cần phải có ít nhất 1 ký tự in thường")
    .matches(/[0-9]/, "Bạn cần phải có ít nhất 1 ký tự là con số")
    .matches(/[!@#%&]/, "Bạn cần phải có ít nhất 1 ký tự đặc biệt !@#%&")
    .required("Vui lòng nhập password"),
});

const SignInPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schemaValidation),
  });
  // Tạo state toggle passowrd
  //Begin
  const [togglePassword, setTogglePassword] = useState(false);
  const handleIconEyes = () => {
    setTogglePassword(!togglePassword);
  };
  //End
  // BUTTON PUSH API
  const handleSignIn = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success("Đăng nhập tài khoản thành công!");
    navigate("/");
  };
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Login Page";
  }, []);
  useEffect(() => {
    const errorsArr = Object.values(errors);
    // console.log(errorsArr);
    if (errorsArr.length > 0) {
      toast.error(errorsArr[0]?.message, { pauseOnHover: false, delay: 0 });
    }
  }, [errors]);

  return (
    <SignInPageStyle>
      <div className="container">
        <div className="logo">
          <div className="logo__wrapper">
            <img src={logo} alt="" className="logo__img" />
            <p className="logo__text">Hung Blogging</p>
          </div>
          {/* onSubmit cho Form thông qua handleSubmit trong useForm */}
          <form className="form" onSubmit={handleSubmit(handleSignIn)}>
            <Field>
              <Label htmlFor="email">Email address</Label>
              <Input
                name="email"
                type="email"
                className="input__email"
                placeholder="Please enter your email address"
                control={control}
              >
                <div className="input__check__icon">
                  <AiFillCheckCircle className="checked__icon"></AiFillCheckCircle>
                  <AiFillCloseCircle className="closed__icon"></AiFillCloseCircle>
                </div>
              </Input>
            </Field>
            <Field>
              <Label htmlFor="password">password</Label>
              <Input
                name="password"
                type={togglePassword ? "text" : "password"}
                placeholder="Please enter your password"
                control={control}
              >
                {togglePassword ? (
                  <IconEyesOpen
                    className="icon__eyes"
                    onClick={handleIconEyes}
                  ></IconEyesOpen>
                ) : (
                  <IconEyesClose
                    className="icon__eyes"
                    onClick={handleIconEyes}
                  ></IconEyesClose>
                )}
              </Input>
            </Field>
            <div className="had__account">
              Bạn chưa có tài khoản? <NavLink to={"/sign-up"}>Register</NavLink>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </SignInPageStyle>
  );
};

export default SignInPage;

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
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-folder/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import slugify from "slugify";

const SignUpPageStyle = styled.div`
  margin-top: 30px;

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
  .had__account {
    margin-bottom: 25px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
    }
  }
`;

const schemaValidation = yup.object({
  fullname: yup.string().required("Họ và tên của bạn là gì?"),
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

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "obSubmit",
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
  const handleSignUp = async (values) => {
    // if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1655185495448-5317953167b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    });
    console.log(auth.currentUser);
    //Gửi dữ liệu lên database
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      ...values,
      username: slugify(values.fullname, { lower: true }),
      createdAt: serverTimestamp(),
      avatar:
        "https://images.unsplash.com/photo-1655185495448-5317953167b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    });
    toast.success("Đăng ký tài khoản thành công!");
    navigate("/");
  };
  //
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
    <SignUpPageStyle>
      <div className="container">
        <div className="logo">
          <NavLink to="/" className="text-decoration">
            <div className="logo__wrapper">
              <img src={logo} alt="" className="logo__img" />
              <p className="logo__text">Hung Blogging</p>
            </div>
          </NavLink>
          {/* onSubmit cho Form thông qua handleSubmit trong useForm */}
          <form className="form" onSubmit={handleSubmit(handleSignUp)}>
            <Field>
              <Label htmlFor="fullname">fullname</Label>
              <Input
                name="fullname"
                placeholder="Enter your fullname"
                control={control}
              ></Input>
            </Field>
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
              Bạn đã có tài khoản? <NavLink to={"/sign-in"}>Login</NavLink>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </SignUpPageStyle>
  );
};

export default SignUpPage;

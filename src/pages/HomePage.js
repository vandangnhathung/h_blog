import { signOut } from "firebase/auth";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase-folder/firebase-config";
import styled from "styled-components";
import Header from "../components/layout/Header";
const HomePageStyles = styled.div``;

const HomePage = () => {
  /*
  // const navigate = useNavigate();
  // const handleLogOut = () => {
  //   signOut(auth);
  //   navigate("/sign-in");
  // };
 */
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  );
};

export default HomePage;

import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import IconSearching from "../../icon/IconSearching";
import logo from "../../images/logo.jpg";
import Input from "../input/Input";
import Button from "../button/Button";
import { useAuth } from "../../contexts/auth-context";

const HeaderStyles = styled.div`
  margin-top: 30px;
  .header-main {
    display: flex;
    align-items: center;
  }
  .header-img {
    width: 43px;
    height: 56px;
    margin-right: 30px;
  }
  .header-navigations {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
    font-size: 18px;
    line-height: calc(27 / 18) px;
    font-weight: 500;
  }
  .header-navigation a {
    color: #000;
    text-decoration: none;
  }
  .header-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 21px;
  }
  .header-searching {
    max-width: 320px;
    position: relative;
  }
  .input-searching {
    flex: 1;
  }
  .icon-searching {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
  }
`;
const Header = () => {
  const { control } = useForm();
  const { userInfo } = useAuth();
  // console.log(userInfo);
  const headerNavigations = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Blog",
      url: "/Blog",
    },
    {
      title: "Contact",
      url: "/Contact",
    },
  ];
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to={"/"}>
            <img src={logo} alt="" className="header-img" />
          </NavLink>
          <ul className="header-navigations">
            {headerNavigations.map((item) => (
              <li className="header-navigation" key={item.title}>
                <NavLink to={item.url} className="header-link">
                  {item.title}{" "}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="header-right">
            <div className="header-searching">
              <Input
                name="searching"
                placeholder="Search posts..."
                type="text"
                control={control}
              >
                <IconSearching className="icon-searching"></IconSearching>
              </Input>
            </div>
            {!userInfo ? (
              <Button
                type="submit"
                style={{
                  maxWidth: "191px",
                  width: "auto",
                  padding: "10px 25px",
                  fontSize: "18px",
                }}
                height="56px"
                to={"/sign-up"}
              >
                Sign Up
              </Button>
            ) : (
              <div className="header-auth">
                <strong>Xin chào </strong>
                <span>{userInfo?.displayName}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;

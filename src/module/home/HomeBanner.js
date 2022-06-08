import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";
import imgHuman from "../../images/banner_img_human.png";
const HomeBannerStyles = styled.div`
  margin-top: 40px;
  height: 519px;
  background-image: linear-gradient(to right, #00b4aa, #a4d96c);

  .banner {
    padding-top: 53px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      max-width: 450px;
      width: 100%;
      align-self: flex-start;
      margin-top: 59px;
    }
    &-title {
      color: white;
      line-height: 58.51px;
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 28px;
    }
    &-desc {
      color: white;
      line-height: calc(28px / 14px);
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 28px;
    }
    &-right {
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-left">
            <h1 className="banner-title">Monkey Blogging</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button bg="secondary" to="/sign-up">
              Get Started
            </Button>
          </div>
          <div className="banner-right">
            <img src={imgHuman} alt="" className="banner-img" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;

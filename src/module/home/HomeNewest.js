import React from "react";
import styled from "styled-components";
import Category from "../../components/infomation/Category";
import Info from "../../components/infomation/Info";
import Heading from "../../components/layout/Heading";
import PostItem from "../post/PostItem";

const HomeNewestStyles = styled.div`
  margin-top: 60px;
  .newest {
    &-layout {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 30px;
    }
    &-left {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 10px;
    }
    &-img {
      margin-bottom: 25px;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      height: 443px;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &-content {
      padding: 0 10px;
    }
    &-sidebar {
      background-color: #f3edff;
      padding: 25px 19px;
    }
  }
`;
const HomeNewest = () => {
  return (
    <HomeNewestStyles>
      <div className="container">
        <Heading>Newest update</Heading>
        <div className="newest-layout">
          <div className="newest-left">
            <div className="newest-img">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt=""
              />
            </div>
            <div className="newest-content">
              <Category>Knowledge</Category>
              <Info></Info>
            </div>
          </div>
          <div className="newest-sidebar">
            <PostItem></PostItem>
            <PostItem></PostItem>
            <PostItem></PostItem>
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;

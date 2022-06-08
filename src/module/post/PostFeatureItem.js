import React from "react";
import styled from "styled-components";
import Category from "../../components/infomation/Category";

const PostFeatureItemStyles = styled.div`
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  font-family: "Montserrat", sans-serif;
  z-index: 0;
  font-size: 14px;
  line-height: calc(18px / 14px);
  box-shadow: rgba(99, 99, 99, 0.2) 4px 7px 6px 0px;
  font-weight: 600;
  .post {
    &-img {
    }
    &-content {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      color: white;
      padding: 18px 9px 22px 22px;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    &-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }
    &-date {
    }
    &-author {
      cursor: pointer;
    }
    &-title {
      font-size: 22px;
      cursor: pointer;
      line-height: calc(28px / 22px);
    }
  }
`;
const PostFeatureItem = () => {
  return (
    <PostFeatureItemStyles>
      <div className="overlay"></div>
      <img
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80"
        alt=""
        className="post-img"
      />
      <div className="post-content">
        <div className="post-top">
          <Category>Knowledge</Category>
          <div className="post-right">
            <p className="post-date">Mar 23</p>
            <span className="post-author">Andiez Le</span>
          </div>
        </div>
        <p className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </p>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;

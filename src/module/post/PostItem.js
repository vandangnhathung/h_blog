import React from "react";
import styled from "styled-components";
import Category from "../../components/infomation/Category";
import Info from "../../components/infomation/Info";
const PostItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 28px;
  padding-bottom: 25px;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .sidebar {
    &-img {
      max-width: 181px;
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
      cursor: pointer;
    }
    &-right {
    }
  }
`;

const PostItem = () => {
  return (
    <PostItemStyled>
      <img
        src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt=""
        className="sidebar-img"
      />
      <div className="sidebar-right">
        <Category type="secondary">Knowledge</Category>
        <Info type="secondary"></Info>
      </div>
    </PostItemStyled>
  );
};

export default PostItem;

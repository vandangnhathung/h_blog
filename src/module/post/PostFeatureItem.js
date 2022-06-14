import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../../components/infomation/Category";
import { db } from "../../firebase-folder/firebase-config";

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
  height: 200px;
  .post {
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-content {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      color: white;
      padding: 18px 9px 22px 22px;
      width: 100%;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      gap: 10px;
      font-size: 12px;
    }

    &-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      margin-left: auto;
    }
    &-date {
    }
    &-author {
      cursor: pointer;
      position: relative;
      margin-left: 10px;
      :before {
        content: "";
        background-color: #fff;
        position: absolute;
        border-radius: 100rem;
        width: 5px;
        height: 5px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: -9%;
        pointer-events: none;
        cursor: none;
      }
    }
    &-title {
      font-size: 22px;
      cursor: pointer;
      line-height: calc(28px / 22px);
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const colSingleRef = doc(db, "users", data.userId);
      const dataSingle = await getDoc(colSingleRef);
      setUser(dataSingle.data());
    })();
  }, [data.userId]);
  console.log(data);
  //GET CATEGORYID
  const [category, setCategory] = useState();
  useEffect(() => {
    (async () => {
      const colSignRef = doc(db, "categories", data.categoryId);
      const dataSingle = await getDoc(colSignRef);
      setCategory(dataSingle.data());
    })();
  }, [data.categoryId]);
  //Get DATE
  const date = new Date(data.createdAt.seconds * 1000).toLocaleDateString(
    "vi-VI"
  );
  //------------------
  return (
    <PostFeatureItemStyles>
      <div className="overlay"></div>
      <img src={data?.imageAPI} alt="" className="post-img" />
      <div className="post-content">
        <div className="post-top">
          <Category to={category?.slug}>{category?.name}</Category>
          <div className="post-right">
            <p className="post-date">{date}</p>
            <span className="post-author">{user?.fullname}</span>
          </div>
        </div>
        <p className="post-title">{data?.title}</p>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;

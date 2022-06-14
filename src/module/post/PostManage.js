import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ActionRemove from "../../components/action/ActionRemove";
import ActionUpdate from "../../components/action/ActionUpdate";
import ActionView from "../../components/action/ActionView";
import { Dropdown } from "../../components/dropdown";
import { useAuth } from "../../contexts/auth-context";
import DashboardHeading from "../../drafts/DashboardHeading";
import { db } from "../../firebase-folder/firebase-config";
import PostContent from "./PostContent";

const PostManageStyles = styled.div``;
const Td = styled.td`
  padding: 0;
  padding-top: 8px;
  padding: 12px 5px 0;
  vertical-align: middle;
`;
const PostManage = () => {
  const { userInfo, setUserInfo } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPosts(results);
    });
  }, []);
  console.log(posts);
  return (
    <PostManageStyles>
      <DashboardHeading title="All posts" desc="Manage your posts">
        <Dropdown>
          <Dropdown.SelectYourCategory
            type="managePost"
            placeholder="Category"
          ></Dropdown.SelectYourCategory>
        </Dropdown>
      </DashboardHeading>
      <div className="overflow-hidden rounded-lg">
        <table className="w-full">
          <thead className="bg-[#e7ecf3]">
            <tr>
              <th className="">Id</th>
              <th className="">Post</th>
              <th className="">Category</th>
              <th className="">Author</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              {
                /* setUserInfo(post.userId); */
              }
              {
                /* console.log(userInfo);  */
              }
              return (
                <tr key={post.id}>
                  <Td>{post.id}</Td>
                  <Td>
                    <PostContent
                      imageAPI={post.imageAPI}
                      title={post.title}
                      createdAt={post.createdAt}
                    ></PostContent>
                  </Td>
                  <Td className="italic text-[#B2B1B9]"></Td>
                  <Td>Hung</Td>
                  <Td>
                    <div className="flex align-center gap-x-4 justify-center">
                      <ActionView></ActionView>
                      <ActionUpdate></ActionUpdate>
                      <ActionRemove></ActionRemove>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PostManageStyles>
  );
};

export default PostManage;

import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase-folder/firebase-config";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeaturedStyles = styled.div`
  margin-top: 60px;
`;
const HomeFeatured = () => {
  //GET FEATURED POST
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const colRef = collection(db, "posts");
      const q = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", true),
        limit(3)
      );
      onSnapshot(q, (snapshot) => {
        let arrCategoriesData = [];
        snapshot.forEach((doc) => {
          arrCategoriesData.push({ id: doc.id, ...doc.data() });
        });
        setCategoriesData(arrCategoriesData);
      });
    };
    getCategories();
  }, []);
  if (categoriesData.length <= 0) return null;
  console.log(categoriesData);
  //----------------------------------------------------------------------------------//
  return (
    <HomeFeaturedStyles>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid">
          {categoriesData.map((item) => (
            <PostFeatureItem key={item.id} data={item}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeaturedStyles>
  );
};

export default HomeFeatured;

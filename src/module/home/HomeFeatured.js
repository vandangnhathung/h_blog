import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeaturedStyles = styled.div`
  margin-top: 60px;
`;
const HomeFeatured = () => {
  return (
    <HomeFeaturedStyles>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeaturedStyles>
  );
};

export default HomeFeatured;

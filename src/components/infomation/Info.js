import React from "react";
import styled from "styled-components";
const InfoStyled = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin-top: 10px;
  .info {
    &-title {
      font-size: ${(props) => (props.type === "secondary" ? "18px" : "22px")};
      line-height: ${(props) => (props.type === "secondary" ? "24px" : "28px")};
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;
      cursor: pointer;
    }
    &-author {
      display: inline-block;
      font-size: 14px;
      color: #6b6b6b;
      span:last-child {
        cursor: pointer;
      }
    }
    &-date {
      margin-right: 10px;
    }
  }
`;
const Info = ({ ...props }) => {
  const { type } = props;
  return (
    <InfoStyled type={type}>
      <h3 className="info-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3>
      <div className="info-author">
        <span className="info-date">Mar 23</span>
        <span>Andiez Le</span>
      </div>
    </InfoStyled>
  );
};

export default Info;

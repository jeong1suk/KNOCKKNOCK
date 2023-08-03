import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

function MainPage() {
  return (
    <>
    <ImgBox>
      <img
      src={"mainImage.webp"}
      style={{
            width: "65rem",
            height: "30rem",
            maxWidth: "100%",
            maxHeight: "100%",
            paddingTop: "98px"
          }}
        />    
      </ImgBox>
      <ImgBox>
        <img
          src={"main2.gif"}
          style={{
            width: "70rem",
            height: "35rem",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </ImgBox>
      <ImgBox>
          <img
            src={"interview.webp"}
            style={{
              width: "70rem",
              height: "35rem"
            }}
          />
      </ImgBox>
      <ImgBox>
          <img
            src={"intro.webp"}
            style={{
              width: "70rem",
              height: "35rem"
            }}
          />
      </ImgBox>
      <ImgBox>
          <img
            src={"present.webp"}
            style={{
              width: "70rem",
              height: "35rem",
            }}
          />
      </ImgBox>
      < br/>

      <Contents>
        <SmallContents>
          <TitleP>기능소개</TitleP>
          <ContentP >기능소개입니다</ContentP>
          <ContentP>소개소개~</ContentP>
        </SmallContents>        

          <Carousel></Carousel>
          {/* <LinkButton to="/ai">☞ ToneTeller 바로가기</LinkButton> */}
      </Contents>

    </>
  );
}
const Contents = styled.div`
  margin: 0 7rem 0 7rem;
  
`;
const SmallContents = styled.div`
  margin-left:4.9rem;
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;


// const MainContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   position: relative;
//   // margin: auto;
//   //margin-top: 20px; 
//   margin-bottom: 20px; 
//   border: 1px solid #000;
//   max-width: 100%;
//   height: 70vh;
//   @media (max-width: 768px) {
//     /* 화면 너비가 768px 이하일 때의 스타일 */
//     max-width: 100%;
//   }
// `;

// const LinkButton = styled(Link)`
//   display: inline-block;
//   margin-top: 10px;
//   padding: 10px 20px;
//   border-radius: 10px;
//   background-color: #fad9eb;
//   color: white;
//   text-decoration: none;
//   text-align: center;
// `;

const TitleP = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 3.4rem;
`;
const ContentP = styled.p`
  font-size: 1.5rem;
`


export default MainPage;

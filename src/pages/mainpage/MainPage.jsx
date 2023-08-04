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
          alt="mainImage"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "65rem",
            maxHeight: "30rem",
            paddingTop: "98px",
          }}
        />
      </ImgBox>
      <ImgBox>
        <img
          src={"main2.gif"}
          alt="main2"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "65rem",
            maxHeight: "30rem",
          }}
        />
      </ImgBox>
      <Contents>
        <SmallContents>
          {/* <TitleP>기능소개</TitleP>
          <ContentP>기능소개입니다</ContentP>
          <ContentP>소개소개~</ContentP> */}
        </SmallContents>

        <Carousel></Carousel>
        {/* <LinkButton to="/ai">☞ ToneTeller 바로가기</LinkButton> */}
      </Contents>
      <ImgBox>
        <img
          src={"interview.webp"}
          alt="interview"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "65rem",
            maxHeight: "30rem",
          }}
        />
      </ImgBox>
      
      <ImgBox>
        <img
          src={"intro.webp"}
          alt="intro"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "65rem",
            maxHeight: "30rem",
          }}
        />
      </ImgBox>
      <ImgBox>
        <img
          src={"present.webp"}
          alt="present"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "65rem",
            maxHeight: "30rem",
          }}
        />
      </ImgBox>
      <br />

    </>
  );
}

const Contents = styled.div`
  margin: 0 9rem 0 9rem;

  @media (max-width: 1100px) {
    margin: 0 1rem 0 1rem;
  }
`;

const SmallContents = styled.div`
  margin-left: 4.9rem;

  @media (max-width: 1400px) {
    margin-left: 0;
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
    max-width: 65rem;
    max-height: 30rem;
    object-fit: contain; 
  }
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
`;

const TitleP = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 3.4rem;

  @media (max-width: 768px) {
    font-size: 2.0rem;
  }
`;

const ContentP = styled.p`
  font-size: 1.5rem;

  @media (max-width: 1414px) {
    margin-left: 0;
    font-size: 1.2rem;
  }
`;

export default MainPage;

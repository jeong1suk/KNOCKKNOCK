import React, { useState } from "react";
import styled from "styled-components";
import MainCarousel from "./Carousel";

function MainPage() {
  return (
    <>
      <ImgBox>
        <img
          src={"main.gif"}
          style={{
            width: "1260px",
            height: "550px",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </ImgBox>
      <MainContainer>
        <p>AI</p>
        <MainCarousel />
      </MainContainer>
      <MainContainer>
        <p>모임</p>
      </MainContainer>
      <MainContainer>
        <p>타로 & 네트워크</p>
      </MainContainer>
    </>
  );
}
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #afe0ed;
  width: 100%;
  height: 100%;
  padding: 100px;
`;
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin: auto;
  border: 1px solid #000;
  max-width: 90%;

  height: 50vh;

  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때의 스타일 */
    max-width: 100%;
  }
`;
export default MainPage;

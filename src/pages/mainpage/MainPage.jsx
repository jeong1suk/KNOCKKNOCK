import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainCarousel from "./Carousel";

function MainPage() {
  const carouselItems = [
    { src: "001.png", alt: "Image 1" },
    { src: "002.png", alt: "Image 2" },
    { src: "005.png", alt: "Image 3" },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handlePrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : carouselItems.length - 1
    );
  };

  const handleNextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < carouselItems.length - 1 ? prevIndex + 1 : 0
    );
  };
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
          <StyledP>ToneTeller</StyledP>
          <StyledP >혁신적인 AI 분석</StyledP>
          <StyledP>퍼스널 컬러로 당신의 성격, 특징을 더 깊이 이해할 수 있도록 도와드립니다.</StyledP>
        </SmallContents>        
        <MainContainer>

          <MainCarousel></MainCarousel>
          {/* <LinkButton to="/ai">☞ ToneTeller 바로가기</LinkButton> */}
        </MainContainer>
      </Contents>

      
      <MainContainer>
        <div>
          <StyledP>오늘의 낙낙</StyledP>
          <StyledP>나와 같은 운명의 상대</StyledP> 
          <StyledP>마음에 드는 이성과 대화를 시작하세요.</StyledP>
        </div>
        <LinkButton to="/todayknock">☞ 오늘의 낙낙 바로가기</LinkButton>
      </MainContainer>
      <MainContainer>
        <div>
          <StyledP>같이 놀자</StyledP>
          <StyledP>설렘 가득한 만남</StyledP>
          <StyledP>똑똑하고 마음이 맞는 수많은 사람들과 경험을 공유하세요.</StyledP>
        </div>
        <LinkButton to="/play">☞ 같이 놀자 바로가기</LinkButton>
      </MainContainer>
    </>
  );
}
const Contents = styled.div`
  margin-left: 7rem;
`
const SmallContents = styled.div`
margin-left:4.7rem;
`
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;


const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  position: relative;
  margin: auto;
  // margin-top: 20px; 
  // margin-bottom: 20px; 
  // border: 1px solid #000;
  max-width: 90%;
  height: 65vh;
  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때의 스타일 */
    max-width: 100%;
  }
`;

const LinkButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fad9eb;
  color: white;
  text-decoration: none;
  text-align: center;
`;

const StyledP = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 30px;
`;


export default MainPage;

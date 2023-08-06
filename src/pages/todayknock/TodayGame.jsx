import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { keyframes } from 'styled-components';
import UserProfile from "./UserProfile";
import * as Api from "../../api";

const limit = 3;
const randomId = Math.floor(Math.random() * 10) + 21;

const TodayGame = ({ onExit, selectedCard, onCardSelect}) => {
  const [showModal, setShowModal] = useState(false);
  const [leftButtonClickCount, setLeftButtonClickCount] = useState(0);
  const [rightButtonClickCount, setRightButtonClickCount] = useState(0);

  

  const cardsGetRequest = async () => {
    try {
      const res = await Api.get(`/cards?limit=${limit}`);
      onCardSelect(res.data.card);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }


  const cardsPostRequset = async (cardId) => {
    try {
      await Api.post(`/cards?cardId=${cardId}`);
      cardsGetRequest();

    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }

  const handleCardClick = (cardId) => {
    // Start the animations
    const cards = document.querySelectorAll('.image-container');
    cards.forEach(card => card.classList.add('animate'));
  
    setTimeout(() => {
      cardsPostRequset(cardId);
    }, 1000); // Wait for the animations to finish
  };

  const handleButtonClick = (side) => {
    if (leftButtonClickCount + rightButtonClickCount < 5) {
      if (side === "left") {
        setLeftButtonClickCount(leftButtonClickCount + 1);
      } else if (side === "right") {
        setRightButtonClickCount(rightButtonClickCount + 1);
      }
    }
  };

  const handleExitModal = () => {
    setShowModal(false);
    setLeftButtonClickCount(0);
    setRightButtonClickCount(0);
  };

  console.log(selectedCard);

  useEffect(() => {
    cardsGetRequest();
  }, [])
  return (
    <>

{selectedCard ?
      <CardImageContainer>
        <CardImage src={selectedCard.CardFile?.File?.url} />
        <p>{selectedCard.content}</p>
      </CardImageContainer>
              :
              <Container>
                <ImageContainer className="image-container">
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer className="image-container">
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
              </Container>
              }
              

      {/* {leftButtonClickCount + rightButtonClickCount >= 5 && (
        <ExitBox>
          <ExitButton onClick={onExit}>Exit</ExitButton>
        </ExitBox>
      )} */}
      <ExitBox>
        <ExitButton onClick={onExit}>Exit</ExitButton>
      </ExitBox>
    </>
  );
};

export default TodayGame;
const moveToCenter = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(50% - 50px)); } /* 50px should be half of card width */
`;

// Fade out
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// Fade in
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  width: 25%;
  height: 25%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ExitBox = styled.div`
  display: flex;
  justify-content: center;
`;

const ExitButton = styled.button`
  margin-top: 1rem;
  height: 2rem;
  background-color: #9ea7d6;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  &:hover {
    background-color: #7b88b8;
    cursor: pointer;
  }
`;

const RankUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  flex: 0 0 20%; /* 초기 크기를 20%로 설정 (5장씩 나열) */
  min-width: 75px; /* 카드의 최소 크기 설정을 75px로 변경 */
  height: 10%; /* 높이를 절반으로 줄임 */
  background-color: aliceblue;
  text-align: center;
  line-height: 50px; /* line-height를 절반으로 줄임 */
  transition: width 1s, height 1s;

  /* 화면 크기에 따라 카드 수 변경 */
  @media (max-width: 1200px) {
    flex: 0 0 25%; /* 초기 크기를 30%로 설정 (4장씩 나열) */
  }

  @media (max-width: 800px) {
    flex: 0 0 33.33%; /* 초기 크기를 33.33%로 설정 (3장씩 나열) */
  }

  &.animate {
    animation: ${moveToCenter} 1s forwards, ${fadeOut} 1s 1s forwards;
  }
`;


const Image = styled.img`
  width: 50%; /* 너비를 절반으로 줄임 */
  height: 50%; /* 높이를 절반으로 줄임 */
  object-fit: cover;
  transition: width 1s, height 1s;

  ${ImageContainer}:hover & {
    width: 100px; /* hover 시 너비를 100px로 설정 */
    height: 150px; /* hover 시 높이를 150px로 설정 */
  }
`;

const CardImage = styled.img`
  width: 40%;
`

const CardImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s;

`


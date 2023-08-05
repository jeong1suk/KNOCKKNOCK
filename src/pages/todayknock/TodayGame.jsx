import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import * as Api from "../../api";

const limit = 1;
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
    cardsPostRequset(cardId)
  }

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
      {!showModal ? (
        <>
          {leftButtonClickCount + rightButtonClickCount < 5 ? (
            <>
              <ButtonGroup>
                <button onClick={() => handleButtonClick("left")}>Left</button>
                <button onClick={() => handleButtonClick("right")}>
                  Right
                </button>
              </ButtonGroup>
              {selectedCard ?
              <CardImageContainer>
                <CardImage src={selectedCard.CardFile?.File?.url} />
                <p>{selectedCard.content}</p>
              </CardImageContainer> 
              :
              <Container>
                <ImageContainer>
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} onClick={() => handleCardClick(randomId)}/>
                </ImageContainer>
              </Container>
              }
              
              <br />
              {/* <Container>
                <ImageContainer>
                  <Image src={"012.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"012.png"} />
                </ImageContainer>
                <ImageContainer>
                  <Image src={"011.png"} />
                </ImageContainer>
              </Container> */}
            </>
          ) : (
            <>
              <p style={{ fontSize: 30 }}>Top3</p>
              <RankUser>
                <UserProfile />
                <UserProfile />
                <UserProfile />
              </RankUser>
            </>
          )}
        </>
      ) : (
        <ModalOverlay>
          <ModalContent>
            <div>End</div>
            <ExitButton onClick={handleExitModal}>Exit</ExitButton>
          </ModalContent>
        </ModalOverlay>
      )}
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
  justify-content: space-between;
`;
const ImageContainer = styled.div`
  width: 155px;
  height: 245px;
  background-color: aliceblue;
  text-align: center;
  line-height: 100px;
  transition: width 1s, height 1s;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: width 1s, height 1s;

  ${ImageContainer}:hover & {
    width: 200px;
    height: 300px;
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
`
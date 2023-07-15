import React, { useState } from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';

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
  background-color: #FFF;
  padding: 20px;
  border-radius: 5px;
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
  color: #FFF;
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
`

const TodayGame = ({ onExit }) => {
  const [showModal, setShowModal] = useState(false);
  const [leftButtonClickCount, setLeftButtonClickCount] = useState(0);
  const [rightButtonClickCount, setRightButtonClickCount] = useState(0);

  const handleButtonClick = (side) => {
    if (leftButtonClickCount + rightButtonClickCount < 5) {
      if (side === 'left') {
        setLeftButtonClickCount(leftButtonClickCount + 1);
      } else if (side === 'right') {
        setRightButtonClickCount(rightButtonClickCount + 1);
      }
    }
  };


  const handleExitModal = () => {
    setShowModal(false);
    setLeftButtonClickCount(0);
    setRightButtonClickCount(0);
  };

  return (
    <>
      {!showModal ? (
        <>
          {leftButtonClickCount + rightButtonClickCount < 5 ? (
            <ButtonGroup>
              <button onClick={() => handleButtonClick('left')}>Left</button>
              <button onClick={() => handleButtonClick('right')}>Right</button>
            </ButtonGroup>
          ) : (
            <>
            <p style={{fontSize:30}}>Top3</p>
            <RankUser><UserProfile /><UserProfile /><UserProfile /></RankUser>
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
      {leftButtonClickCount + rightButtonClickCount >= 5 && (
        <ExitBox>
        <ExitButton onClick={onExit}>Exit</ExitButton>
        </ExitBox>
      )}
    </>
  );
};

export default TodayGame;

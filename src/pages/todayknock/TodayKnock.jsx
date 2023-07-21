import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';
import TodayGame from './TodayGame';
import * as API from '../../api'; 

const Container = styled.div`
  background-color: #D2DAFF;
`;

const Banner = styled.div`
  height: 30vh;
  display: flex;
  justify-content: flex-end;
  background-color: #FFF;
  background-image: url('https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202001/29/a61d0ff9-df15-4d47-a4a6-79b377c3655a.jpg');
`;

const StartButton = styled.button`
  margin-top: 1rem;
  margin-right: 1.2rem;
  height: 2rem;
  background-color: #9ea7d6;
  color: #FFF;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #7b88b8;
    cursor: pointer;
  }
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
  width: 70%;
  height: 70%;
  background-color: #FFF;
  padding: 20px;
  border-radius: 5px;
`;

const UserProfilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: -3rem 0;

  & > :nth-child(n) {
    margin-top: 5rem;
  }
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TodayKnock() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    API.get('/users/network')
      .then(response => {
        console.log("넘어오긴 햇음")
        setUsers(response.data.randomUsers);
      })
      .catch(error => {
        console.error('API 호출 오류:', error);
      });
  }, []);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const handleExitModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div style={{ height: '10vh' }} /> 
      <Banner>
        <StartButton onClick={handleStartClick}>START</StartButton>
      </Banner>
      <div style={{ height: '10vh' }} /> 
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <TodayGame onExit={handleExitModal} />
          </ModalContent>
        </ModalOverlay>
      )}
      <UserProfilesContainer>
        {users.map((user) => (
          <UserProfileBox key={user.user_id}>
            <UserProfile user={user} />
          </UserProfileBox>
        ))}
      </UserProfilesContainer>
      <div style={{ height: '50vh' }} />
    </Container>
  );
}

export default TodayKnock;

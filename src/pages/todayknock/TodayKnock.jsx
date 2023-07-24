import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import TodayGame from "./TodayGame";
import * as API from "../../api";

const Container = styled.div``;

const Banner = styled.div`
  height: 40vh;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  background-image: url("https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202001/29/a61d0ff9-df15-4d47-a4a6-79b377c3655a.jpg");
  position: relative;
  background-size: contain;
  background-position: center;
  max-height: 100%;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
`;

const StartButton = styled.button`
  margin-top: 1rem;
  margin-right: 1.2rem;
  height: 2rem;
  background-color: #9ea7d6;
  color: #fff;
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
  background-color: #fff;
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

const ArrowButton = styled.button`
  font-size: 5rem;
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ArrowButtonLeft = styled(ArrowButton)`
  left: 20px;
`;

const ArrowButtonRight = styled(ArrowButton)`
  right: 20px;
`;

function TodayKnock() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users/network")
      .then((response) => {
        console.log("넘어오긴 햇음");
        setUsers(response.data.randomUsers);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  }, []);

  const handleStartClick = () => {
    setShowModal(true);
  };

  const handleExitModal = () => {
    setShowModal(false);
  };

  const bannerImages = [
    "url('https://assets.xboxservices.com/assets/9d/26/9d2649d8-ce95-4845-9956-a8b54715d112.jpg?n=Accessory-Hub_Page-Hero-1084_403913_1920x720.jpg')",
    "url('https://news.xbox.com/en-us/wp-content/uploads/sites/2/2022/03/Hero_Family_JPG.jpg')",
    "url('https://www.nintendo.co.kr/switch/awuxa/assets/img/top/hero/switch.png')",
  ];

  const [bannerIndex, setBannerIndex] = useState(0);

  const handleNextBanner = () => {
    setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handlePrevBanner = () => {
    setBannerIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <div style={{ height: "10vh" }} />
      <Banner style={{ backgroundImage: bannerImages[bannerIndex] }}>
        <StartButton onClick={handleStartClick}>START</StartButton>
        <ArrowButtonLeft onClick={handlePrevBanner}>{"<"}</ArrowButtonLeft>
        <ArrowButtonRight onClick={handleNextBanner}>{">"}</ArrowButtonRight>
      </Banner>
      <div style={{ height: "10vh" }} />
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
      <div style={{ height: "50vh" }} />
    </Container>
  );
}

export default TodayKnock;

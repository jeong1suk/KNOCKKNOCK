import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import TodayGame from "./TodayGame";
import * as Api from "../../api";
import UserModal from "./UserModal";
import { showAlert } from "../../assets/alert";
import { useNavigate } from "react-router-dom";

const limit = 3;
const isLoverUser = ["Lover", "User"];
function TodayKnock() {
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [randomLovers, setRandomLovers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  const [selectedCard, setSelectedCard] = useState();

  const usersGetRequest = async () => {
    try {
      const res = await Api.get(`users/network`);
      setRandomUsers(res.data.randomUsers);
    } catch (err) {
      if (err.response.data.message) {
        showAlert(err.response.data.message);
        navigate("/login", { replace: true });
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const cardsGetRequest = async () => {
    try {
      const res = await Api.get(`/cards?limit=${limit}`);
      setRandomLovers(res.data.randomLovers);
      setSelectedCard(res.data.card);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleUserProfileClick = async (userId) => {
    try {
      const res = await Api.get(`/users/${userId}`);
      setSelectedUser(res.data);
      setShowUserModal(true);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleStartClick = () => {
    setShowStartModal(true);
  };

  const handleStartModalExit = () => {
    cardsGetRequest();
    setShowStartModal(false);
  };

  const handleUserModalExit = () => {
    setShowUserModal(false);
  };

  const bannerImages = [
    "url('https://assets.xboxservices.com/assets/9d/26/9d2649d8-ce95-4845-9956-a8b54715d112.jpg?n=Accessory-Hub_Page-Hero-1084_403913_1920x720.jpg')",
  ];

  // const [bannerIndex, setBannerIndex] = useState(0);

  // const handleNextBanner = () => {
  //   setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  // };

  // const handlePrevBanner = () => {
  //   setBannerIndex((prevIndex) =>
  //     prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
  //   );
  // };

  useEffect(() => {
    usersGetRequest();
    cardsGetRequest();
  }, []);

  return (
    <Container>
      <div style={{ height: "10vh" }} />
      <Banner onClick={handleStartClick}>
        <StartButton onClick={handleStartClick}>START</StartButton>
        {/* <ArrowButtonLeft onClick={handlePrevBanner}>{"<"}</ArrowButtonLeft>
        <ArrowButtonRight onClick={handleNextBanner}>{">"}</ArrowButtonRight> */}
      </Banner>
      <div style={{ height: "10vh" }} />
      {showStartModal && (
        <ModalOverlay>
          <ModalContent>
            <TodayGame
              onExit={handleStartModalExit}
              selectedCard={selectedCard}
              onCardSelect={setSelectedCard}
            />
          </ModalContent>
        </ModalOverlay>
      )}
      {showUserModal && selectedUser && (
        <ModalOverlay onClick={handleUserModalExit}>
          <ModalContentUser onClick={(e) => e.stopPropagation()}>
            <UserModal
              user={selectedUser}
              // onClose={handleUserModalExit}
            />
          </ModalContentUser>
        </ModalOverlay>
      )}

      {selectedCard && (
        <>
          <RandomUserExplainDiv>
            <p>같은 연애운을 가진 사람을 찾아봐요!</p>
          </RandomUserExplainDiv>
          <UserProfilesContainer>
            {randomLovers.map((user) => (
              <UserProfile
                user={user.User}
                key={user.id}
                onClick={() => handleUserProfileClick(user.User.userId)}
                isLoverUser={isLoverUser[0]}
              />
            ))}
          </UserProfilesContainer>
        </>
      )}
      <RandomUserExplainDiv>
        <p>다양한 사람들을 알아봐요!</p>
      </RandomUserExplainDiv>
      <UserProfilesContainer>
        {randomUsers.map((user) => (
          <UserProfile
            user={user}
            key={user.userId}
            onClick={() => handleUserProfileClick(user.userId)}
            isLoverUser={isLoverUser[1]}
          />
        ))}
      </UserProfilesContainer>
    </Container>
  );
}

export default TodayKnock;

const Container = styled.div`
  margin-bottom: 20rem;
`;

const Banner = styled.div`
  height: 40vh;
  display: flex;
  justify-content: flex-end;
  background-color: #391f41;
  background-image: url("/gamebackground.webp");
  position: relative;
  cursor: pointer;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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

const ModalContentUser = styled.div`
  width: 40%;
  height: 80%;
  background-color: #fff;
  padding: 1rem;
  padding-top: 2rem;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
`;

const ModalContent = styled.div`
  width: 70%;
  height: 90%;
  overflow: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const UserProfilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15vw, 1fr));
  gap: 10%;
  padding: 10%;
  margin: -10rem 0 -5rem 0 ;
  & > :nth-child(n) {
    margin-top: 5rem;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
    grid-gap: 1px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

const RandomUserExplainDiv = styled.div`
  display: flex;
  justify-content: center;
  border: 10px double #f7cbd0;
  p {
    font-family: "KIMM_Bold";
    font-size: 3rem;
    color: #1d1d1f;
    font-weight: 600;
    line-height: 1.2;
  }
`;

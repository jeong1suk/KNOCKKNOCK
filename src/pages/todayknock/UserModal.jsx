import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getImageSrc } from "../../util/imageCheck";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
function getRandomColorPairs() {
  const colorPairs = [
    ["#f0cdd0", "#efe6e6"],
    ["#eef0cd", "#eeefe6"],
    ["#cdecf0", "#e6eeef"],
    ["#ebcdf0", "#eee6ef"],
    ["#cdf0d4", "#e6efe9"],
  ];

  const randomIndex = Math.floor(Math.random() * colorPairs.length);
  return colorPairs[randomIndex];
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function UserProfile({ user, onClose }) {
  const navigate = useNavigate();
  const colorPair = getRandomColorPairs(); // 랜덤한 색상 쌍 얻기
  const rightColor = colorPair[0];
  const handleChatButtonClick = async () => {
    try {
      const response = await Api.post("/chats", {
        anotherId: user.userId,
      });
      const chatId = response.data.chatId;
      navigate("/mypage");
    } catch (error) {
      console.error("채팅방 생성에 실패했습니다:", error);
    }
  };
  const shuffledHobby = shuffleArray(user.hobby || []);
  const shuffledIdeal = shuffleArray(user.ideal || []);
  const shuffledPersonality = shuffleArray(user.personality || []);
  const handleCloseClick = () => {
    onClose();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  
  return (
    <Container>
      <UserProfileBox>
        <CloseButton onClick={handleCloseClick}>X</CloseButton>
        <BackgroundImage
          style={{
            background: `linear-gradient(to left, ${colorPair.join(", ")})`,
          }}
        />
        <ProfilePicture
          src={getImageSrc(user.profileImage)}
          alt="Profile Picture"
        />
        <UserProfileContainer>
          <UserNameAndChat>
            <Nickname>{user.nickname}</Nickname>
            <ChatButton
              style={{ backgroundColor: rightColor }}
              onClick={handleChatButtonClick}
            >
              📩 Chat
            </ChatButton>
          </UserNameAndChat>
          <Email>{user.email}</Email>

          <Tagline>{user.introduce}</Tagline>
          
          <UserInfomationBox>
            <UserInformation>
              <UserLineContainer>
                <UserLine>Age: {user?.age}</UserLine>
              </UserLineContainer>
              <UserLineContainer>
                <UserLine>MBTI: {user?.mbti || "비공개"}</UserLine>
              </UserLineContainer>
              <UserLineContainer>
                <UserLine>Height: {user?.height}</UserLine>
              </UserLineContainer>
              <UserLineContainer>
                <UserLine>Job: {user?.job}</UserLine>
              </UserLineContainer>
              <UserLineContainer>
                <UserLine>Region: {user?.region}</UserLine>
              </UserLineContainer>
            </UserInformation>
            <HobbyAllBox>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontFamily: "KIMM_Bold",
                  margin: "0 0 20px 0"
                }}
                >
                <span style={{ padding: "5px", color: "#fa9393" }}>취미</span>
                <span style={{ padding: "5px", color: "rgb(248, 143, 255)" }}>
                  성격
                </span>
                <span style={{ padding: "5px", color: "#87d5fc" }}>이상형</span>
              </p>
              <HobbyBoxContainer>
                {shuffledHobby.map((hobby, index) => (
                  <HobbyBox key={index} style={{ order: index }}>
                    {hobby}
                  </HobbyBox>
                ))}
              </HobbyBoxContainer>
              <HobbyBoxContainer>
                {shuffledIdeal.map((ideal, index) => (
                  <IdealBox key={index} style={{ order: index }}>
                    {ideal}
                  </IdealBox>
                ))}
              </HobbyBoxContainer>
              <HobbyBoxContainer>
                {shuffledPersonality.map((personality, index) => (
                  <PersonBox key={index} style={{ order: index }}>
                    {personality}
                  </PersonBox>
                ))}
              </HobbyBoxContainer>
            </HobbyAllBox>
          </UserInfomationBox>
        </UserProfileContainer>
      </UserProfileBox>
    </Container>
  );
}

export default UserProfile;
const CloseButton = styled.button`
  background-color: transparent;
  color: #999898;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
const ChatButton = styled.button`
  background-color: #ffffff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 2rem;
  margin-left: 1rem;
  margin-top: -1rem;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 0.5rem; /* 아이콘과 텍스트 사이의 간격 설정 */
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
    margin-top: 1rem;
  }
  @media (max-width: 460px) {
    font-size: 0.4rem;
    margin-top: 1rem;
  }
  &:hover {
    background: ${(props) => props.backgroundColor || "#ffffff"};
  }
`;

const UserNameAndChat = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  height: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  @media (max-width: 768px) {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
  }
`;
const UserProfileBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  position: relative;
`;
const BackgroundImage = styled.div`
  width: 100%;
  height: 15vh;
  background: ${(props) => props.style.background};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  @media (max-width: 768px) {
    height: 13vh;
  }
  @media (max-width: 460px) {
    height: 11vh;
  }
`;
const ProfilePicture = styled.img`
  width: 6rem;
  height: 6rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -3rem;
  margin-left: 3rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Nickname = styled.h2`
  margin-top: -1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #4b4a4a;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  @media (max-width: 460px) {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
`;

const Email = styled.h4`
  margin-top: -0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #cacaca;
  @media (max-width: 768px) {
    font-size: 0.3rem;
  }
`;

const Tagline = styled.div`
  border: 0.1rem #bcbcbc;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #676565;
  font-size: 0.9rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    font-size: 0.4rem;
  }
`;

const UserInfomationBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 3rem;
  gap: 40px;
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
  }
`;

const UserInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const UserLineContainer = styled.div`
  display: flex;
  width: 9rem;
  margin: 0.1rem;
  justify-content: space-around;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  @media (max-width: 768px) {
    padding: 0.3rem;
    margin: 0.1rem;
  }
`;
const UserLine = styled.h3`
  margin: 0.3rem;
  color: #8f8f8f;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
const HobbyAllBox = styled.div`
  @media (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`;
const HobbyBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #fa9393;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 3.3rem;
    height: 1.8rem;
    font-size: 0.5rem;
    margin: 0rem 0.1rem;
  }
  @media (max-width: 360px) {
    width: 2.8rem;
    height: 1.5rem;
    font-size: 0.3rem;
    margin: 0rem 0.1rem;
  }
`;
const IdealBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: rgb(248, 143, 255);
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 3.3rem;
    height: 1.8rem;
    font-size: 0.5rem;
    margin: 0rem 0.1rem;
  }
  @media (max-width: 360px) {
    width: 2.8rem;
    height: 1.5rem;
    font-size: 0.3rem;
    margin: 0rem 0.1rem;
  }
`;

const PersonBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #87d5fc;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 3.3rem;
    height: 1.8rem;
    font-size: 0.5rem;
    margin: 0rem 0.1rem;
  }
  @media (max-width: 360px) {
    width: 2.8rem;
    height: 1.5rem;
    font-size: 0.3rem;
    margin: 0rem 0.1rem;
  }
`;
const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem;
`;

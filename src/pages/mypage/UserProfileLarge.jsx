import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import * as Api from "../../api";
// import { UserStateContext } from "../../App";
import UserProfileEdit from "./UserProfileEdit";
import { getImageSrc } from "../../util/imageCheck";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

const UserProfileContainer = styled.div`
  width: 22rem;
  margin-top: 2rem;
`;
const UserProfileBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 6rem;
  margin-right: 3rem;
`;
const Nickname = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #4b4a4a;
`;

const Email = styled.h4`
  margin-top: -0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #cacaca;
`;

const Tagline = styled.div`
  border: 0.1rem #bcbcbc;
  height: auto;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #676565;
  font-size: 0.9rem;
`;

const UserInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
const UserLineContainer = styled.div`
  display: flex;
  width: 10rem;
  margin-bottom: 0.3rem;
  justify-content: space-around;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;
const UserLine = styled.h3`
  margin: 0.3rem;
  color: #8f8f8f;
  font-size: 1rem;
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
`;
const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
`;
const ProfilePicture = styled.img`
  width: 8rem;
  height: 8rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -5.5rem;
  margin-right: 50rem;
  margin-left: 8rem;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
const UserProfileLarge = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    Api.get("/users/mypage")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  }, []);

  const shuffledHobby = shuffleArray(user.hobby || []);
  const shuffledIdeal = shuffleArray(user.ideal || []);
  const shuffledPersonality = shuffleArray(user.personality || []);
  return (
    <UserProfileContainer>
      <ProfilePicture
        src={getImageSrc(user.profileImage)}
        alt="Profile Picture"
      />
      <UserProfileEdit user={user} />

      <UserProfileBox>
        <UserInformation>
          <Nickname>{user.nickname}</Nickname>
          <Email>{user.email}</Email>
          <Tagline>{user.introduce}</Tagline>
        </UserInformation>
        <UserInformation>
          <UserLineContainer>
            <UserLine>Name: {user.name}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>MBTI: {user.mbti}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>Height: {user.height || "비공개"}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>Job: {user.job}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>Region: {user.region || "비공개"}</UserLine>
          </UserLineContainer>
        </UserInformation>
      </UserProfileBox>
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
    </UserProfileContainer>
  );
};

export default UserProfileLarge;

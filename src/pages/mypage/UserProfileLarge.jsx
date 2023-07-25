import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";

const UserProfileContainer = styled.div``;

const Nickname = styled.h2`
  color: #4b4a4a;
`;

const Email = styled.h4`
  color: #cacaca;
`;

const Tagline = styled.div`
  border: 0.1rem #bcbcbc;
  padding: 0.5rem;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #676565;
  font-size: 1rem;
`;

const UserInformation = styled.div`
  border: 1px solid #c0c0c0;
  margin: 2rem;
`;
const UserLineContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const UserLine = styled.h3`
  margin: 0.5rem;
  color: #8f8f8f;
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
  font-size: 0.8rem;
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
  font-size: 0.8rem;
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
  font-size: 0.8rem;
`;
const HobbyBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem;
`;

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
function UserProfile() {
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
      <>
        <Nickname>{user.nickname}</Nickname>
        <Email>{user.email}</Email>
        <Tagline>{user.introduce}</Tagline>
        <UserInformation>
          <UserLineContainer>
            <UserLine>Name: {user.username}</UserLine>
            <UserLine>MBTI: {user.mbti}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>Height: {user.height || "비공개"}</UserLine>
            <UserLine>Job: {user.job}</UserLine>
          </UserLineContainer>
          <UserLineContainer>
            <UserLine>Region: {user.region || "비공개"}</UserLine>
            <UserLine>Religion: {user.religion}</UserLine>
          </UserLineContainer>
        </UserInformation>
      </>
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
}

export default UserProfile;

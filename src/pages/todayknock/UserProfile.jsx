import React from 'react';
import styled from 'styled-components';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: 21rem;
  max-width: 20rem;
  background-color: aliceblue;
  border-radius: 0.5rem;
`;
const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: 15rem;
  max-width: 20rem;
  background-color: aliceblue;
  border-radius: 0.5rem;
`;
const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://cdn.indiepost.co.kr/uploads/images/2018/10/02/S8xjus-700x340.jpeg');
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const ProfilePicture = styled.img`
  width: 4.5rem;
  height: 8rem;
  border-color: aliceblue;
  border-width: 2px; 
  border-style: solid; 
  border-radius: 100%;
  margin-top: -25px;
  margin-right: 8rem;
`;

const Name = styled.h3`
  margin-top: -2.2rem;
  margin-left: 2rem;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const SmallBox = styled.div`
  width: 3.3rem;
  height: 1.8rem;
  border-radius: 0.8rem;
  background-color: #c1c1c1;
  margin: 0 2.8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
`;

const Tagline = styled.div`
  width: 93%;
  height: 4rem;
  background-color: #a7a6a6;
  border-radius: 0.5rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; 
`;


const UserProfile = () => {
  return (
    <UserProfileContainer>
      <UserProfileBox>
      <BackgroundImage />
      <ProfilePicture src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg" alt="Profile Picture" />
      <Name>유진이</Name>
      <SmallBoxContainer>
        <SmallBox>INFP</SmallBox>
        <SmallBox>168cm</SmallBox>
        <SmallBox>비공개</SmallBox>
        <SmallBox>99년생</SmallBox>
      </SmallBoxContainer>
      </UserProfileBox>
      <Tagline>안녕하세요 유진이에요<br />잘 부탁드려요</Tagline>
    </UserProfileContainer>
  );
};

export default UserProfile;

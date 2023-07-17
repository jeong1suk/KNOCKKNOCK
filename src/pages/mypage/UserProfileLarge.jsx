import React from 'react';
import styled from 'styled-components';

const UserProfileBox = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 40rem;
  background-color: aliceblue;
`;
const BackgroundImage = styled.div`
  width: 40rem;
  height: 30vh;
  background-image: url('https://cdn.indiepost.co.kr/uploads/images/2018/10/02/S8xjus-700x340.jpeg');
  background-size: cover;
  background-position: center;
`;

const ProfilePicture = styled.img`
  width: 8rem;
  height: 8rem;
  border-color: aliceblue;
  border-width: 2px; 
  border-style: solid; 
  border-radius: 100%;
  margin-top: -4rem;
  margin-right: 22rem;
`;

const Name = styled.h3`
  margin-top: -2.8rem;
  margin-left: -5rem;
  font-size: 1.8rem;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const SmallBox = styled.div`
  width: 5rem;
  height: 3rem;
  border-radius: 2rem;
  background-color: #c1c1c1;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
`;
const Introduce =styled.div`

`;
const Tagline = styled.div`
  width: 35rem;
  height: 13rem;
  background-color: #a7a6a6;
  border-radius: 0.5rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; 
  font-size: 1.3rem;
`;


const UserProfile = () => {
  return (
    // <UserProfileContainer>
      <UserProfileBox>
      <BackgroundImage />
      <ProfilePicture src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg" alt="Profile Picture" />
      <Name>유진이</Name>
      <SmallBoxContainer>
        <SmallBox>INFP</SmallBox>
        <SmallBox>168cm</SmallBox>
        <SmallBox>비공개</SmallBox>
        <SmallBox>99년생</SmallBox>
        <SmallBox>비공개</SmallBox>
        <SmallBox>비공개</SmallBox>
      </SmallBoxContainer>
      <Introduce>
        <Tagline>안녕하세요 유진이입니다<br />잘 부탁드려요<br />사진들은 다 임의로 넣은 것입니다.<br />수정ing.....</Tagline>
      </Introduce>
      </UserProfileBox>
    // </UserProfileContainer>
  );
};

export default UserProfile;

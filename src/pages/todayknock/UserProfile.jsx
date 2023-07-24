import React from "react";
import styled from "styled-components";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 21rem;
  height: 21rem;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
  border: 7px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://previews.123rf.com/images/sudakasi/sudakasi1405/sudakasi140500174/28673467-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EC%9E%90%EC%97%B0-%EB%B0%B0%EA%B2%BD.jpg");
  background-size: cover;
  background-position: center;
`;

const ProfilePicture = styled.img`
  width: 8.5rem;
  height: 8.5rem;
  border: 3px solid #e9e9e9;
  border-radius: 100%;
  margin-top: -13rem;
  position: relative;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
`;

const Name = styled.h3`
  margin-top: 1rem;
`;

const UserInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
`;

const UserInfoText = styled.p`
  margin: 5px;
`;

const UserProfile = ({ user }) => {
  const {
    username,
    profile_image,
    mbti,
    height,
    region,
    age,
    gender,
    introduce,
  } = user;

  const handleMouseEnter = () => {
    document.getElementById(`userInfo-${user.user_id}`).style.opacity = 1;
  };

  const handleMouseLeave = () => {
    document.getElementById(`userInfo-${user.user_id}`).style.opacity = 0;
  };

  return (
    <>
      <UserProfileContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BackgroundImage />
        <ProfilePicture
          src="https://www.futurekorea.co.kr/news/photo/201907/119520_120439_3313.jpg"
          alt="프로필 사진"
        />

        <UserInfo id={`userInfo-${user.user_id}`}>
          <UserInfoText>{mbti}</UserInfoText>
          <UserInfoText>{height || "비공개"}</UserInfoText>
          <UserInfoText>{region || "비공개"}</UserInfoText>
          <UserInfoText>{age}세</UserInfoText>
          <UserInfoText>{gender}</UserInfoText>
          <UserInfoText>{introduce || "안녕하세요. 반갑습니다."}</UserInfoText>
        </UserInfo>
      </UserProfileContainer>
      <Name>{username}</Name>
    </>
  );
};

export default UserProfile;

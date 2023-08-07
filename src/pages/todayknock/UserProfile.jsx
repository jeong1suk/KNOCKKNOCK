import React from "react";
import styled from "styled-components";
import { getImageSrc } from "../../util/imageCheck";



const UserProfile = ({ user, onClick, isLoverUser }) => {
  const {
    nickname,
    gender,
    birthday,
    age,
    job,
    region,
    mbti,
    height,
    introduce,
  } = user;

  const handleMouseEnter = () => {
    document.getElementById(`userInfo-${user.userId}`).style.opacity = 1;
  };

  const handleMouseLeave = () => {
    document.getElementById(`userInfo-${user.userId}`).style.opacity = 0;
  };



  return (
    <>

      {isLoverUser == "Lover" ? 
      <LoverProfileContainer>
        <LoverProfilePicture
        src={getImageSrc(user.UserFiles[0]?.File?.url)}
        alt="프로필 사진"
        onClick={onClick}
        />
        <HoverText>프로필 정보 보기</HoverText> 
      </LoverProfileContainer>
        
      :
        <UserProfileContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
        >
          <ProfilePicture
            src={getImageSrc(user.UserFiles[0]?.File?.url)}
            alt="프로필 사진"
          />

          <UserInfo id={`userInfo-${user.userId}`}>
            <UserInfoText>{mbti}</UserInfoText>
            <UserInfoText>{birthday}</UserInfoText>
            <UserInfoText>{job}</UserInfoText>
            <UserInfoText>{height || "비공개"}</UserInfoText>
            <UserInfoText>{region || "비공개"}</UserInfoText>
            <UserInfoText>{age}세</UserInfoText>
            <UserInfoText>{gender}</UserInfoText>
            <UserInfoText>{introduce || "안녕하세요. 반갑습니다."}</UserInfoText>
          </UserInfo>
          <Name>{nickname}</Name>
        </UserProfileContainer>
        }
      
    </>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
  border: 7px solid #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  background-color: #edecec;
`;

const ProfilePicture = styled.img`
  width: 15rem;
  height: 15rem;
  border: 3px solid #e9e9e9;
  margin-top: 1rem;
  position: relative;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10%;
`;

const Name = styled.h3`
  margin-top: 1.5rem;
  color: #666666;
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

const LoverProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  position: relative;
  border-radius: 100%;
`

const LoverProfilePicture = styled.img`
  width: 100%;
  height: 80%;
  border: 4px solid #F7CBD0;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.3s ease; // Transition effect

  &:hover {
    border: 4px solid #FECDE4;
    transform: scale(1.02);
    opacity: 0.5; // Image will darken on hover
  }
`

const HoverText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: dark; // Change this as needed
  transition: all 0.3s ease;

  ${LoverProfileContainer}:hover & {
    opacity: 1;
  }
`

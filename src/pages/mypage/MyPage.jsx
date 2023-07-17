import React from 'react';
import styled from 'styled-components';
import UserProfileLarge from './UserProfileLarge';

const Container = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #E3E8FF;
  padding: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Bubble = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  margin-left: 10px;
`;

function  MyPage() {
  return (
    <Container>
      <LeftSection>
          <UserProfileLarge />
      </LeftSection>
      <RightSection>
        <MessageContainer>
          <ProfileImage src="profile_image_url" alt="Profile Image" />
          <Bubble>안녕하세요!</Bubble>
        </MessageContainer>
        <MessageContainer>
          <Bubble>잘 지내시나요?</Bubble>
          <ProfileImage src="profile_image_url" alt="Profile Image" />
        </MessageContainer>
      </RightSection>
    </Container>
  );
};

export default MyPage;

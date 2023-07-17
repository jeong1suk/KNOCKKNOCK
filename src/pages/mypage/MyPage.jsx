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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
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
  margin: 0 10px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-top: 5px;
`;

function MyPage() {
  return (
    <Container>
      <LeftSection>
        <UserProfileLarge />
      </LeftSection>
      <RightSection>
        <ProfileImage src="https://4.bp.blogspot.com/-G53f8Dq74s4/Uuepa3BrLrI/AAAAAAAADUU/qHUw26hrKco/s1600/%EB%AA%85%ED%83%90%EC%A0%95_%EC%BD%94%EB%82%9C-1.jpg" alt="Profile Image" />
        <UserName>허광한</UserName>
        <MessageContainer>
          <ProfileImage src="https://4.bp.blogspot.com/-G53f8Dq74s4/Uuepa3BrLrI/AAAAAAAADUU/qHUw26hrKco/s1600/%EB%AA%85%ED%83%90%EC%A0%95_%EC%BD%94%EB%82%9C-1.jpg" alt="Profile Image" />
          <Bubble>안녕하세요!</Bubble>
        </MessageContainer>
        <MessageContainer>
          <ProfileImage src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMjhfMTI0/MDAxNTE3MTI2OTg5NTQw.287Oj7sW-4MZCHUUGq-S1F4d1njVzeS43EoolWUBtQEg.x5BaTuQXeAFRO1wPfJooN3xwzsaAAWJEshsGSA3j7-Mg.JPEG.aida4520/image_2078508621517126966809.jpg?type=w800" alt="Profile Image" />
          <Bubble>잘 지내시나요?</Bubble>
        </MessageContainer>
      </RightSection>
    </Container>
  );
}

export default MyPage;

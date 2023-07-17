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
  padding: 3rem;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  height: 34rem;
`;
const MessageChat = styled.div`
  display: flex;
  height: 34rem;
  justify-content: flex-end;
  flex-direction: column;
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
const ProfileImageBox =styled.div`
  display: flex;
  margin-bottom: 3rem;
  flex-direction: column;
  align-items: center;
`
const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
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
  margin-top: 1rem;
  font-size: 1.3rem;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 1rem 0rem 1rem;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 5px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function MyPage() {
  return (
    <Container>
      <LeftSection>
        <UserProfileLarge />
      </LeftSection>
      <RightSection>
        <ProfileImageBox>
          <ProfileImage src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg" alt="Profile Image" />
          <UserName>토리</UserName>
        </ProfileImageBox>
        <MessageChat>
        <MessageContainer>
          <ProfileImage src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg" alt="Profile Image" />
          <Bubble>안녕하세요!</Bubble>
        </MessageContainer>
        <MessageContainer>
          <ProfileImage src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg" alt="Profile Image" />
          <Bubble>잘 지내시나요?</Bubble>
        </MessageContainer>
        <MessageContainer>
          <ProfileImage src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg" alt="Profile Image" />
          <Bubble>네니오</Bubble>
        </MessageContainer>
        <ChatInputContainer>
          <ChatInput type="text" placeholder="메시지를 입력하세요" />
          <SendButton>전송</SendButton>
        </ChatInputContainer>
        </MessageChat>
      </RightSection>
    </Container>
  );
}

export default MyPage;

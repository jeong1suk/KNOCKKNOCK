import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import UserProfileLarge from './UserProfileLarge';

const Container = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative; 
`;

const RightSection = styled.div`
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

const ProfileImageBox = styled.div`
  display: flex;
  margin-bottom: 3rem;
  flex-direction: column;
  align-items: center;
`;

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

const MenuButton = styled.button`
  position: absolute;
  top: 2.5rem;
  right: 0rem;
  padding: 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Overlay = styled.div`
  top: 5rem;
  right: 0rem;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const PageContent = styled.div`
  background-color: white;
  padding: 3rem;
  height: 34rem;
  margin-top: -2rem;

  animation: ${props => (props.isOpen ? slideInAnimation : slideOutAnimation)} 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: 1rem;
  padding: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
function MyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container>
      <LeftSection>
        <UserProfileLarge />
      </LeftSection>
      <RightSectionWrapper>
        <MenuButton onClick={toggleMenu}>☰</MenuButton>
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
        {isMenuOpen && (
          <Overlay>
            <PageContent isOpen={isMenuOpen}>
              <h1>Menu</h1>
              {/* Menu content goes here */}
              <CloseButton onClick={toggleMenu}>✕</CloseButton>
            </PageContent>
          </Overlay>
        )}
        </RightSection>
      </RightSectionWrapper>
    </Container>
  );
}

export default MyPage;

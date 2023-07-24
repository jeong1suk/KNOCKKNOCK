import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import UserProfileLarge from "./UserProfileLarge";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfileBox = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150vh;
  background-color: #f2f2f2e2;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 30vh;
  background-color: #ddc892;
  background-size: cover;
  background-position: center;
`;

const ProfilePicture = styled.img`
  width: 9rem;
  height: 9rem;
  border-color: #f2f2f2e2;
  border-width: 3px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -5rem;
  margin-right: 60rem;
`;

const LeftSection = styled.div`
  margin-right: 2rem;
`;

const RightSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RightSection = styled.div`
  background-color: #f2f2f2e2;
  margin-top: -7rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 40rem;
`;

const MessageChat = styled.div`
  display: flex;
  height: 80vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #e3e8ff;
  padding: 2rem;
`;

const MessageBox = styled.div``;

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
  border: none;
  width: 50rem;
  height: 1.8rem;
  padding: 10px;
  border-radius: 5px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  width: 5rem;
  height: 3rem;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const SectionButton = styled.button`
  padding: 10px;
  margin: 0 10px;
  background-color: ${(props) => (props.isActive ? "#ddd" : "transparent")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function MyPage() {
  const [activeSection, setActiveSection] = useState("chat");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Container>
      <UserProfileBox>
        <BackgroundImage />
        <ProfilePicture
          src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg"
          alt="Profile Picture"
        />
        <RightSectionWrapper>
          <LeftSection>
            <UserProfileLarge />
          </LeftSection>
          <RightSection>
            <Section>
              <SectionButton
                onClick={() => handleSectionChange("chat")}
                isActive={activeSection === "chat"}
              >
                채팅
              </SectionButton>
              <SectionButton
                onClick={() => handleSectionChange("myPosts")}
                isActive={activeSection === "myPosts"}
              >
                내가쓴글
              </SectionButton>
            </Section>

            {activeSection === "chat" && (
              <MessageChat>
                <ProfileImageBox>
                  <ProfileImage
                    src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg"
                    alt="Profile Image"
                  />
                  <UserName>토리</UserName>
                </ProfileImageBox>
                <MessageBox>
                  <MessageContainer>
                    <ProfileImage
                      src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg"
                      alt="Profile Image"
                    />
                    <Bubble>안녕하세요!</Bubble>
                  </MessageContainer>
                  <MessageContainer>
                    <ProfileImage
                      src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg"
                      alt="Profile Image"
                    />
                    <Bubble>잘 지내시나요?</Bubble>
                  </MessageContainer>
                  <MessageContainer>
                    <ProfileImage
                      src="https://cdn.discordapp.com/attachments/1090903178603659326/1127977609351934072/image0.jpg"
                      alt="Profile Image"
                    />
                    <Bubble>네니오</Bubble>
                  </MessageContainer>
                  <ChatInputContainer>
                    <ChatInput type="text" placeholder="메시지를 입력하세요" />
                    <SendButton>전송</SendButton>
                  </ChatInputContainer>
                </MessageBox>
              </MessageChat>
            )}
            {activeSection === "myPosts" && (
              <div>{/* Your "내가쓴글" (my posts) content goes here */}</div>
            )}
          </RightSection>
        </RightSectionWrapper>
      </UserProfileBox>
    </Container>
  );
}

export default MyPage;

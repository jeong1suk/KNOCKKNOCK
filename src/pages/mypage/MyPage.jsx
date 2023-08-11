// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { getImageSrc } from "../../util/imageCheck";
// import UserPostAndParticipants from "./UserPostAndParticipants";
// import UserProfileLarge from "./UserProfileLarge";
// import ChatComponent from "./ChatService";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const UserProfileBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   height: 150vh;
//   background-color: #f2f2f2e2;
// `;

// const BackgroundImage = styled.div`
//   width: 100%;
//   height: 30vh;
//   background: linear-gradient(to left, #f0987f, #f8d6cc);
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   background-size: cover;
//   background-position: center;
// `;

// const ProfilePicture = styled.img`
//   width: 8rem;
//   height: 8rem;
//   border-color: #f2f2f2e2;
//   border-width: 4px;
//   border-style: solid;
//   border-radius: 100%;
//   margin-top: -5.5rem;
//   margin-right: 50rem;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const LeftSection = styled.div`
//   margin-right: 2rem;
// `;

// const RightSectionWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 4.4rem;
// `;

// const RightSection = styled.div`
//   background-color: #f2f2f2e2;
//   margin-top: -7rem;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   width: 40rem;
// `;

// const MessageChat = styled.div`
//   display: flex;
//   height: 80vh;
//   justify-content: space-between;
//   flex-direction: column;
//   background-color: #f5f5f7;
//   padding: 2rem;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const MessageBox = styled.div``;

// const MessageContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   margin-bottom: 10px;

//   &:nth-child(even) {
//     flex-direction: row-reverse;
//   }
// `;

// const ProfileImageBox = styled.div`
//   display: flex;
//   margin-bottom: 3rem;
//   flex-direction: column;
//   align-items: center;
// `;

// const ProfileImage = styled.img`
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 50%;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const Bubble = styled.div`
//   background-color: white;
//   padding: 10px;
//   border-radius: 20px;
//   margin: 0 10px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   font-size: 0.8rem;
// `;

// const UserName = styled.div`
//   font-weight: bold;
//   margin-top: 1rem;
//   font-size: 1.1rem;
// `;

// const ChatInputContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 2rem 1rem 0rem 1rem;
// `;

// const ChatInput = styled.input`
//   border: none;
//   width: 50rem;
//   height: 1.8rem;
//   padding: 10px;
//   border-radius: 5px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const SendButton = styled.button`
//   margin-left: 10px;
//   width: 6rem;
//   height: 3rem;
//   padding: 10px 20px;
//   background-color: #ffffff;
//   color: #b5b5b5;
//   border: 1px solid #e8e8e8;
//   border-radius: 5px;
//   cursor: pointer;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: #f2f2f2;
//   }
// `;

// const Section = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 1rem;
//   margin-bottom: 2rem;
// `;

// const SectionButton = styled.button`
//   padding: 10px;
//   margin: 0 10px;
//   background-color: ${(props) => (props.isActive ? "#ddd" : "transparent")};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

// function MyPage() {
//   const [activeSection, setActiveSection] = useState("chat");

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//   };

//   return (
//     <Container>
//       <UserProfileBox>
//         <BackgroundImage />
//         <ProfilePicture
//           src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/1002/IE002401068_STD.jpg"
//           alt="Profile Picture"
//         />
//         <RightSectionWrapper>
//           <LeftSection>
//             <UserProfileLarge />
//           </LeftSection>
//           <RightSection>
//             <Section>
//               <SectionButton
//                 onClick={() => handleSectionChange("chat")}
//                 isActive={activeSection === "chat"}
//               >
//                 채팅
//               </SectionButton>
//               <SectionButton
//                 onClick={() => handleSectionChange("myPosts")}
//                 isActive={activeSection === "myPosts"}
//               >
//                 내가쓴글
//               </SectionButton>
//             </Section>

//             {activeSection === "chat" && <ChatComponent />}
//             {activeSection === "myPosts" && <div>안녕</div>}
//           </RightSection>
//         </RightSectionWrapper>
//       </UserProfileBox>
//     </Container>
//   );
// }

// export default MyPage;

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { getImageSrc } from "../../util/imageCheck";
import UserPostAndParticipants from "./UserPostAndParticipants";
import UserProfileLarge from "./UserProfileLarge";
import ChatComponent from "./ChatService";
import * as Api from "../../api";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
const MyPage = () => {
  const [activeSection, setActiveSection] = useState("chat");
  // const res = await Api.get("/users/mypage/posts");
  // console.log(res.data.posts);
  // console.log(res.data.participants);
  const [isHovered, setIsHovered] = useState(false);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container>
      <BackgroundImage />
      <UserProfileBox>
        {/* <ProfilePicture
          src={getImageSrc(user.UserFiles?.[-1]?.File?.url)}
          alt="Profile Picture"
        /> */}
        <RightSectionWrapper>
          <LeftSection>
            <UserProfileLarge />
          </LeftSection>
          <RightSection>
            <Section>
              <SectionButton
                onClick={() => handleSectionChange("chat")}
                isactive={activeSection === "chat"}
              >
                Chat
              </SectionButton>
              <SectionButton
                onClick={() => handleSectionChange("myPosts")}
                isactive={activeSection === "myPosts"}
              >
                Post
              </SectionButton>
            </Section>

            {activeSection === "chat" && <ChatComponent />}
            {activeSection === "myPosts" && <UserPostAndParticipants />}
          </RightSection>
        </RightSectionWrapper>
      </UserProfileBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  /* border: 3px solid black; */
  /* background-color: #f2f2f2e2; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding-bottom: 40px;
  z-index: 10;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 100%;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 30vh;
  background: linear-gradient(to left, #f0987f, #f8d6cc);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  position: relative;
  /* &:hover {
    background: gray;
    cursor: pointer;
  } */

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    z-index: -10;
  }
`;
const ChangeBackgroundButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: white;
  border: 2px solid #f0987f;
  border-radius: 4px;
  color: #f0987f;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
const ProfilePicture = styled.img`
  width: 8rem;
  height: 8rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -5.5rem;
  margin-right: 50rem;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  margin-right: 2rem;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    // flex-direction: column;
    margin-right: 0;
  }
`;

const RightSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.4rem;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    flex-direction: column;
  }
`;

const RightSection = styled.div`
  // border: 1px solid gray;
  border-radius: 20px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-top: -2rem;
  background-color: #FFFFFF;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-top: 0.5rem;
  }
`;

const MessageChat = styled.div`
  display: flex;
  height: 80vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #f5f5f7;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Bubble = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  margin: 0 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.1rem;
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SendButton = styled.button`
  margin-left: 10px;
  width: 6rem;
  height: 3rem;
  padding: 10px 20px;
  background-color: #ffffff;
  color: #b5b5b5;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Section = styled.div`
  top: 0;
  left: 10;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  /* border: 1px solid black; */
`;

const SectionButton = styled.button`
  padding: 10px;
  margin: 0 10px;
  background-color: ${(props) => (props.isactive ? "#ddd" : "transparent")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
export default MyPage;

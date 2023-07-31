import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import * as API from "../../api";

const socket = io.connect("http://localhost:3000", {
  path: "/socket.io", // 서버 path와 일치시켜줍니다.
  transports: ["websocket"], // 웹 소켓을 사용하도록 지정합니다.
});
const MessageChat = styled.div`
  display: flex;
  height: 80vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #f5f5f7;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.isUserMessage ? "flex-end" : "flex-start"};

  &:nth-child(even) {
    flex-direction: ${(props) => (props.isUserMessage ? "row-reverse" : "row")};
  }
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.div``;

const Bubble = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  margin: 0 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
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

// function ChatComponent() {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [profileImage, setProfileImage] = useState(""); // 상대방 프로필 이미지
//   const [userName, setUserName] = useState(""); // 상대방 이름

//   useEffect(() => {
//     // 채팅 메시지를 수신하는 이벤트 핸들러
//     socket.on("receive-message", (message) => {
//       setChatHistory((prevChat) => [...prevChat, message]);
//     });

//     // 유저 정보 가져오기
//     const userId = 7; // 상대방의 userId를 적절하게 지정해야 합니다.
//     API.get(`/users/${userId}`)
//       .then((response) => {
//         console.log("유저 정보 가져오기 성공!!:", response.data);
//         setProfileImage(response.data.profileImage);
//         setUserName(response.data.nickname);
//       })
//       .catch((error) => {
//         console.error("유저 정보 가져오기 실패:", error);
//       });

//     return () => {
//       // 컴포넌트가 unmount될 때 이벤트 핸들러 제거
//       socket.off("receive-message");
//     };
//   }, []);

//   const sendMessage = (text, sender) => {
//     if (text.trim() !== "") {
//       const newMessage = {
//         text: text.trim(),
//         sender: sender,
//       };
//       socket.emit("send-message", newMessage);
//       setChatHistory((prevChat) => [...prevChat, newMessage]);
//       setMessage("");
//     }
//   };

//   const handleSendMessage = () => {
//     sendMessage(message, "user"); // 사용자가 보낸 메시지인 경우 sender를 "user"로 설정
//   };

//   return (
//     <MessageChat>
//       {/* 상대방 프로필 이미지와 이름을 채팅창 상단에 표시 */}
//       <ProfileImage src={profileImage} alt="Profile Image" />
//       <UserName>{userName}</UserName>
//       <MessageBox>
//         {chatHistory.map((msg, index) => (
//           <MessageContainer key={index}>
//             {/* 사용자 프로필 이미지는 기존과 동일하게 사용 */}
//             <ProfileImage
//               src={
//                 msg.sender === "user"
//                   ? "사용자 프로필 이미지 URL"
//                   : profileImage
//               }
//               alt="Profile Image"
//             />
//             <Bubble>{msg.text}</Bubble>
//           </MessageContainer>
//         ))}
//       </MessageBox>
//       <ChatInputContainer>
//         <ChatInput
//           type="text"
//           placeholder="메시지를 입력하세요"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <SendButton onClick={handleSendMessage}>전송</SendButton>
//       </ChatInputContainer>
//     </MessageChat>
//   );
// }

// export default ChatComponent;

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setChatHistory((prevChat) => [...prevChat, message]);
    });

    API.get("/chats")
      .then((response) => {
        console.log("채팅 목록 가져오기 성공:", response.data);
        const allChatList = response.data.allChatList;
        if (allChatList.length > 0) {
          const chatRoom = allChatList[0];
          // 채팅 메시지 배열을 "messages" 키로 가정하고 추출하여 업데이트합니다.
          const chatMessages = chatRoom.messages;
          if (Array.isArray(chatMessages)) {
            setChatHistory(chatMessages);
          } else {
            console.error("채팅 메시지 배열이 올바르지 않습니다.");
          }
          setUserName(chatRoom.User.nickname);
          if (chatRoom.User.UserFiles.length > 0) {
            setProfileImage(chatRoom.User.UserFiles[0].url);
          }
        }
      })
      .catch((error) => {
        console.error("채팅 목록 가져오기 실패:", error);
      });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (text, sender) => {
    if (text.trim() !== "") {
      const newMessage = {
        text: text.trim(),
        sender: sender,
      };
      socket.emit("sendMessage", newMessage);
      setChatHistory((prevChat) => [...prevChat, newMessage]);
      setMessage("");
    }
  };

  const handleSendMessage = () => {
    sendMessage(message, "user");
  };

  return (
    <MessageChat>
      <ProfileImage src={profileImage} alt="Profile Image" />
      <UserName>{userName}</UserName>
      <MessageBox>
        {chatHistory.map((msg, index) => (
          <MessageContainer key={index}>
            <ProfileImage
              src={
                msg.sender === "user"
                  ? "사용자 프로필 이미지 URL"
                  : profileImage
              }
              alt="Profile Image"
            />
            <Bubble>{msg.text}</Bubble>
          </MessageContainer>
        ))}
      </MessageBox>
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>전송</SendButton>
      </ChatInputContainer>
    </MessageChat>
  );
}

export default ChatComponent;

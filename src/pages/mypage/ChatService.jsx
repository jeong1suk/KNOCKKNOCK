import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import * as API from "../../api";

const socket = io.connect("http://localhost:3000", {
  path: "/socket.io",
  transports: ["websocket"],
});
const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MessageChat = styled.div`
  display: flex;
  width: 30rem;
  height: 70vh;
  flex-direction: column;
  background-color: #f5f5f7;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-right: 1rem;
  justify-content: space-between;
`;

const ChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #f5f5f7;
  padding: 4rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 64vh;
  overflow-y: scroll;
  margin-top: 2rem;
`;

const UserListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
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
  margin-top: auto;
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

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [senderId, setSenderId] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    // 새로운 유저가 접속했을 때 서버로부터 받은 온라인 유저 목록 업데이트
    socket.on("getOnlineUsers", (onlineUsers) => {
      setAllChats(onlineUsers);
    });

    // 서버로부터 새로운 메시지가 도착했을 때 메시지 목록 업데이트
    socket.on("getMessage", (message) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
    });

    // 서버로부터 알림이 도착했을 때 처리 (알림 처리 로직은 여기서 추가해야 함)
    // socket.on("getNotification", (notification) => {
    //   // TODO: 알림 처리 로직 구현
    // });

    // 컴포넌트가 언마운트될 때 소켓 이벤트 리스너 제거
    return () => {
      socket.off("getOnlineUsers");
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [chatId]); // chatId가 변경될 때마다 useEffect 내의 소켓 이벤트 리스너를 재등록

  useEffect(() => {
    API.get("/chats")
      .then((response) => {
        setAllChats(response.data.allChats);
        console.log("allchat!!!", response.data);
      })
      .catch((error) => {
        console.error("채팅 목록 가져오는데 실패,,", error);
      });
  }, []);
  const handleSendMessage = async () => {
    if (chatId && message.trim() !== "") {
      const newMessage = {
        chatId: chatId,
        content: message.trim(),
      };
      try {
        const response = await API.post("/messages", newMessage);
        const updatedChat = response.data;
        setChatHistory([...chatHistory, updatedChat]);
        setMessage("");
        try {
          const messagesResponse = await API.get(`/messages/${chatId}`);
          const messages = messagesResponse.data.messageList;
          console.log(messages, "message!!!");
          setChatHistory(messages);
        } catch (error) {
          console.error("채팅 메시지를 가져오는데 실패:", error);
        }
      } catch (error) {
        console.error("메시지 전송에 실패했습니다:", error);
      }
    }
  };

  const handleChatClick = async (chat) => {
    try {
      setChatId(chat.currentUserInfo.chatId);
      setProfileImage(chat.recieverInfo.UserFiles[0].File.url);
      setUserName(chat.recieverInfo.nickname);
      setSenderId(chat.currentUserInfo.sender);
      const messagesResponse = await API.get(
        `/messages/${chat.currentUserInfo.chatId}`
      );
      const messages = messagesResponse.data.messageList;
      console.log(messages, "message!!!");
      setChatHistory(messages);
    } catch (error) {
      console.error("채팅 정보를 가져오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    if (chatId) {
      API.get(`/messages/${chatId}`)
        .then((response) => {
          const messages = response.data.messageList;
          console.log(messages, "message!!!");
          setChatHistory(messages);
        })
        .catch((error) => {
          console.error("채팅 메시지를 가져오는데 실패:", error);
        });
    }
  }, [chatId]);
  return (
    <ChatContainer>
      <MessageChat>
        <ProfileImage src={profileImage} />
        <UserName>{userName}</UserName>
        <MessageBox>
          {Array.isArray(chatHistory) && chatHistory.length > 0 ? (
            chatHistory.map((chat) => (
              <MessageContainer key={chat.messageId}>
                {chat.senderId === senderId ? (
                  <Bubble>{chat.content}</Bubble>
                ) : (
                  <>
                    <ProfileImage src={profileImage} alt="사진이 안 떠용가리" />
                    <Bubble>{chat.content}</Bubble>
                  </>
                )}
              </MessageContainer>
            ))
          ) : (
            <div>채팅 기록이 없습니다.</div>
          )}
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
      <ChatRoom ref={chatRef}>
        <UserList>
          {allChats.length > 0 &&
            allChats.map((chat) => {
              const profileImageUrl = chat.recieverInfo.UserFiles[0].File.url;
              return (
                <UserListItem
                  key={chat.currentUserInfo.chatId}
                  onClick={() => handleChatClick(chat)}
                >
                  <ProfileImage
                    src={profileImageUrl}
                    alt="사진이 안 떠용가리"
                  />
                  <UserName>{chat.recieverInfo.nickname}</UserName>
                </UserListItem>
              );
            })}
        </UserList>
      </ChatRoom>
    </ChatContainer>
  );
}

export default ChatComponent;

// import { useCallback } from "react";
// import { createContext, useState, useEffect } from "react";
// import { io } from "socket.io-client";

// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children, user }) => {
//   const [useChats, setUserChats] = useState(null);
//   const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
//   const [userChatsError, setUserChatsError] = useState(null);
//   const [potentialChats, setPotentialChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState(null);
//   const [isMessagesLoading, setIsMessagesLoading] = useState(false);
//   const [messagesError, setMessagesError] = useState(null);
//   const [sendTextMessageError, setSendTextMessageError] = useState(null);
//   const [newMessage, setNewMessage] = useState(null);
//   const [socket, setSocket] = useState(null);

//   console.log("messages", messages);
//   const sendMessage = (text, sender) => {
//     if (text.trim() !== "") {
//       const newMessage = {
//         text: text.trim(),
//         sender: sender,
//         chatId: currentChat._id,
//       };
//       socket.emit("sendMessage", newMessage);
//     }
//   };
//   useEffect(() => {
//     if (socket === null) return;

//     socket.on("getMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("getMessage");
//     };
//   }, [socket]);
//   useEffect(() => {
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [user]);
//   //add online users
//   useEffect(() => {
//     if (socket === null) return;
//     socket.emit("addNewUser", user?._id);
//     socket.on("getOnlineUsers", (res) => {
//       setOnlineusers(res);
//     });
//     return () => {
//       socket.off("getOnlineUsers");
//     };
//   }, [socket]);
//   //send message
//   useEffect(() => {
//     if (socket === null) return;

//     const recipientId = currentChat?.members?.find((id) => id !== user?._id);

//     socket.emit("sendMessage", { ...newMessage, recipientId });
//   }, [newMessage]);
//   //receive message
//   useEffect(() => {
//     if (socket === null) return;

//     socket.on("getMessage", (res) => {
//       if (currentChat?._id !== res.chatId) return;

//       setMessages((prev) => [...prev, res]);
//     });

//     return () => {
//       socket.off("getMessage");
//     };
//   }, [socket, currentChat]);

//   useEffect(() => {
//     const getUsers = async () => {
//       const response = await getRequest(`${baseUrl}/users`);
//       if (response.error) {
//         return console.log("Error fetching users", response);
//       }
//     };
//     return (
//       <ChatContext.Provider
//         value={{
//           messages,
//           sendMessage,
//         }}
//       >
//         {children}
//       </ChatContext.Provider>
//     );
//   });

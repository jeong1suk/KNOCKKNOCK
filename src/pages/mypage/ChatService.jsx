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
  height: 72vh;
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
  const [recieverId, setRecieverId] = useState("");
  const chatRef = useRef(null);
  console.log(senderId);
  useEffect(() => {
    socket.on("getOnlineUsers", (onlineUsers) => {
      setAllChats(onlineUsers);
    });
    // socket.emit("addNewUser", senderId);
    socket.on("getMessage", (message) => {
      const newMessage = {
        chatId: chatId,
        content: message.trim(),
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
    });

    // socket.on("getNotification", (notification) => {
    //   // TODO: 알림 처리 로직 구현
    // });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [chatId, senderId]);

  useEffect(() => {
    API.get("/chats")
      .then((response) => {
        setAllChats(response.data.allChats);
        console.log("allchat!!!", response.data);
      })
      .catch((error) => {
        console.error("유저 목록 가져오는데 실패,,", error);
      });
  }, []);
  const handleSendMessage = async () => {
    if (chatId && message.trim() !== "") {
      const newMessage = {
        chatId: chatId,
        content: message.trim(),
      };
      try {
        socket.emit("sendMessage", {
          content: message,
          recieverId: recieverId,
        });
        const response = await API.post("/messages", newMessage);
        setChatHistory([...chatHistory, newMessage]);
        setMessage("");
      } catch (error) {
        console.error("메시지 전송에 실패했습니다:", error);
      }
    }
  };

  const handleChatClick = async (chat) => {
    try {
      setRecieverId(chat.currentUserInfo.reciever);
      setChatId(chat.currentUserInfo.chatId);
      setProfileImage(chat.recieverInfo.UserFiles[0].File.url);
      setUserName(chat.recieverInfo.nickname);
      setSenderId(chat.currentUserInfo.sender);
      socket.emit("addNewUser", chat.currentUserInfo.sender);

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
                    <ProfileImage src={profileImage} alt="프로필사진" />
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
                  <ProfileImage src={profileImageUrl} alt="프로필사진" />
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

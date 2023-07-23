import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";

const UserProfileContainer = styled.div``;

const Name = styled.h3`
  margin-left: -12rem;
  font-size: 1.8rem;
`;
const Email = styled.h3`
  margin-left: -12rem;
  font-size: 1rem;
  color: gray;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
  margin-top: 2rem;
`;

const SmallBox = styled.div`
  width: 3.5rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #c1c1c1;
  margin: 0rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
`;
const Introduce = styled.div``;
const Tagline = styled.div`
  height: 13rem;
  background-color: #a7a6a6;
  border-radius: 0.5rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.3rem;
`;

function UserProfile() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    Api.get("/users/mypage")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("API 호출 오류:", error);
      });
  }, []);
  return (
    <UserProfileContainer>
      {users.map((user) => (
        <>
          <Name>{user.username}</Name>
          <Email>yoojin@test.com</Email>
          <SmallBoxContainer>
            <SmallBox>INFP</SmallBox>
            <SmallBox>168cm</SmallBox>
            <SmallBox>비공개</SmallBox>
            <SmallBox>99년생</SmallBox>
            <SmallBox>비공개</SmallBox>
            <SmallBox>비공개</SmallBox>
          </SmallBoxContainer>
        </>
      ))}
      <Introduce>
        <Tagline>
          안녕하세요 유진이입니다
          <br />잘 부탁드려요
          <br />
          사진들은 다 임의로 넣은 것입니다.
          <br />
          수정ing.....
        </Tagline>
      </Introduce>
    </UserProfileContainer>
  );
}

export default UserProfile;

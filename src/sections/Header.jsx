import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTE } from "../routes/routes";
const Header = ({ children }) => {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Logo>낙낙</Logo>
          <Spacer />
          <MenuList>
            <Link to={ROUTE.MAIN.link}>메인페이지</Link>
            <Link to={ROUTE.AI.link}>인공지능</Link>
            <Link to={ROUTE.LOGIN.link}>로그인</Link>
            <Link to={ROUTE.REGISTER.link}>회원가입</Link>
            <Link to={ROUTE.TodayKnock.link}>오늘의 낙낙</Link>
            <Link to={ROUTE.Mypage.link}>마이페이지</Link>
          </MenuList>
        </HeaderContents>
      </WhiteBackground>
      <GradientBorder />
    </Positioner>
  );
};
// 상단 고정, 그림자
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
`;
// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;
// 해더의 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
`;
// 로고
const Logo = styled.div`
  font-size: 1.4rem;
  letter-spacing: 2px;
  font-family: "Rajdhani";
  color: red;
`;
// 중간 여백
const Spacer = styled.div`
  flex-grow: 1;
`;
const MenuList = styled.li`
  padding: 0 1.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  color: #252525;
  cursor: pointer;
  &:hover {
    color: #f1b24a;
  }
  a {
    font-size: 2.3rem;
    font-weight: 500;
    color: #111;
    &:hover {
      color: #f1b24a;
    }
  }
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
  height: 3px;
`;
export default Header;

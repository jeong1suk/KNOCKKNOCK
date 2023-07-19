import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTE } from "../../routes/routes";
const Header = ({ children }) => {
  return (
    <Positioner>
      <HeaderContents>
        <Logo>낙낙</Logo>

        <MenuList>
          <Link to={ROUTE.MAIN.link}>메인페이지</Link>
          <Link to={ROUTE.AI.link}>인공지능</Link>
          <Link to={ROUTE.LOGIN.link}>로그인</Link>
          <Link to={ROUTE.REGISTER.link}>회원가입</Link>
          <Link to={ROUTE.TodayKnock.link}>오늘의 낙낙</Link>
          <Link to={ROUTE.Mypage.link}>마이페이지</Link>
        </MenuList>
      </HeaderContents>

      <GradientBorder />
    </Positioner>
  );
};
const HeaderWrap = styled.div`
  width: 100%;
  height: 7.6rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const LogoImgBox = styled.div`
  width: 100px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 8rem;
    height: auto;
  }
`;

const NavigationBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Navigation = styled.div`
  display: flex;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
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

const InfoMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 2.4rem;
`;

const UserName = styled.div`
  margin-right: 0.8rem;
  font-size: 2rem;
  font-weight: bold;
  color: #252525;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 5rem;
  font-weight: bold;
  color: #252525;
  span {
    font-size: 2rem;
  }
`;

const SubMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2.4rem;
`;

const SubMenuList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SubMenuBtn = styled.button`
  width: 10rem;
  height: 4rem;
  margin-left: 1.2rem;
  border: ${({ btn }) => (btn === "stroke" ? "1px solid #01881c" : "none")};
  border-radius: 5px;
  background-color: ${({ btn }) => (btn === "stroke" ? "none" : "#01881c")};
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ btn }) => (btn === "stroke" ? "#01881c" : "#fff")};
  }
  &:hover {
    background-color: ${({ btn }) =>
      btn === "stroke" ? "#01881c" : "#78c186"};
    a {
      color: ${({ btn }) => (btn === "stroke" ? "#fff" : "#f3f5f4")};
    }
  }
`;

const MobileMenubox = styled.div`
  margin-left: 24px;
`;

export default Header;

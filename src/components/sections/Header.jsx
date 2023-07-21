import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTE } from "../../routes/routes";
import MobileMenu from "./MobileMenu";
const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to="/">
            <LogoImgBox>
              <img src="src/assets/favicon.png" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
          {!isMobile && (
            <Navigation>
              <NavMenu>
                <MenuList>
                  <Link to={ROUTE.MAIN.link}>메인페이지</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.AI.link}>인공지능</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.LOGIN.link}>로그인</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.REGISTER.link}>회원가입</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.TodayKnock.link}>오늘의 낙낙</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.Play.link}>같이 놀자</Link>
                </MenuList>
                <MenuList>
                  <Link to={ROUTE.Mypage.link}>마이페이지</Link>
                </MenuList>
              </NavMenu>
            </Navigation>
          )}
          {isMobile && (
            <MobileMenubox>
              <MobileMenu />
            </MobileMenubox>
          )}
        </NavigationBox>
      </HeaderContainer>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  height: 6rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 998; */
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
  width: 50px;
  height: 20px;
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
  padding: 0 1rem;
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
    font-size: 1.3rem;
    font-weight: 500;
    color: #111;
    &:hover {
      color: #f1b24a;
    }
  }
`;

const MobileMenubox = styled.div`
  margin-left: 24px;
`;

export default Header;

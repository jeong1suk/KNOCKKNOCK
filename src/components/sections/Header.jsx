import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DispatchContext, UserStateContext } from "../../App";
import { ROUTE } from "../../routes/routes";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import useIsMobile from "../hooks/useIsMobile";
const Header = () => {
  const isMobile = useIsMobile();
  const { user } = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <HeaderWrap>
      <HeaderContainer>
        <LogoBox>
          <Link to={ROUTE.MAIN.link}>
            <LogoImgBox>
              <img src="src/assets/knock.png" />
            </LogoImgBox>
          </Link>
        </LogoBox>
        <NavigationBox>
          {!isMobile && (
            <DesktopMenu
              isLogin={user ? true : false}
              user={user}
              logout={logout}
            />
          )}

          {isMobile && (
            <MobileMenu
              isLogin={user ? true : false}
              user={user}
              logout={logout}
            />
          )}
        </NavigationBox>
      </HeaderContainer>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 998; */
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  width: 30px;
  height: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    width: 4rem;
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
  text-decoration: none;
  &:hover {
    color: #f1b24a;
  }
  a {
    font-size: 0.7rem;
    font-weight: 500;
    color: #111;
    text-decoration: none;
    margin-left: 4rem;
    &:hover {
      color: #f1b24a;
    }
  }
`;

const MobileMenubox = styled.div`
  margin-left: 24px;
`;

export default Header;

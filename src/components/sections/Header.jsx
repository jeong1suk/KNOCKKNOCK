import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTE } from "../../routes/routes";
import { UserStateContext } from "../../App";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(UserStateContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <img src="src/assets/favicon.png" />
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
  height: 6rem;
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

export default Header;

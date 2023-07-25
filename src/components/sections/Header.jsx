import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTE } from "../../routes/routes";
import { UserStateContext, DispatchContext } from "../../App";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(UserStateContext);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUserId(null); // update the state
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    setUserId(localStorage.getItem("userId"));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  z-index: 998;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
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
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
`;
export default Header;

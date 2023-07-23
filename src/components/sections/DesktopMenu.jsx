import styled from "styled-components";
import { Link } from "react-router-dom";
import { ROUTE } from "../../routes/routes";
const DesktopMenu = () => {
  return (
    <DesktopMenuContainer>
      <DesktopNavMenu>
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
      </DesktopNavMenu>
    </DesktopMenuContainer>
  );
};

const DesktopMenuContainer = styled.div`
  display: flex;
`;
const DesktopNavMenu = styled.ul`
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

export default DesktopMenu;

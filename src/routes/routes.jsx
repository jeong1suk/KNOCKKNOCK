import Mainpage from "../pages/mainpage/MainPage";
import Ai from "../pages/ai/Ai";
import LoginForm from "../pages/login/LoginForm";
import RegisterForm from "../pages/register/RegisterForm";
import TodayKnock from "../pages/todayknock/TodayKnock";
import Play from "../pages/play/Play";
import PlayAdd from "../pages/play/PlayAdd";
import MyPage from "../pages/mypage/MyPage";
import PlayDetail from "../pages/play/PlayDetail";

export const ROUTE = {
  MAIN: {
    path: "/",
    link: "/",
    element: Mainpage,
  },
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginForm,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: RegisterForm,
  },
  AI: {
    path: "/ai",
    link: "/ai",
    element: Ai,
  },
  TodayKnock: {
    path: "/todayknock",
    link: "/todayknock",
    element: TodayKnock,
  },
  Play: {
    link: "/play",
    path: "/play",
    element: Play,
  },
  PlayAdd: {
    path: "/playadd",
    link: "/playadd",
    element: PlayAdd,
  },
  PlayDetail: {
    path: "/playdetail",
    link: "/playdetail",
    element: PlayDetail,
  },
  Mypage: {
    path: "/mypage",
    link: "/mypage",
    element: MyPage,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);

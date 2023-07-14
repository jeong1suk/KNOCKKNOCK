import Mainpage from "../pages/mainpage/Mainpage";
import Ai from "../pages/ai/Ai";
import LoginForm from "../pages/login/LoginForm";
import RegisterForm from "../pages/register/RegisterForm";
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
};

export const ROUTE_ARR = Object.values(ROUTE);

import { BrowserRouter } from "react-router-dom";
import Router from "../../routes/Router";
import Header from "./Header";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
};

export default Layout;

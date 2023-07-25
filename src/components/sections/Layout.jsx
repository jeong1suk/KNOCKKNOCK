import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Router from "../../routes/Router";
// import Footer from "./Footer";

const Layout = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Layout;

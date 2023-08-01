import { BrowserRouter } from "react-router-dom";
import Router from "../../routes/Router";
import Header from "./Header";
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

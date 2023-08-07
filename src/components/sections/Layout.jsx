import { BrowserRouter } from "react-router-dom";
import Router from "../../routes/Router";
import Header from "./Header";
import { BaseLayout } from "../layout/Layout"
// import Footer from "./Footer";
const Layout = () => {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Header />
        <Router />      
      </BaseLayout>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Layout;

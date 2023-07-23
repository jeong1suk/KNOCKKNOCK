import { BrowserRouter } from "react-router-dom";
import Router from "../../routes/Router";

const Layout = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default Layout;

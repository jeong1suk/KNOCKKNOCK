/*작성자: 정원석
1.route가 많아지면 해당 파일이 엄청 길어지고 깔끔하지 않게 됩니다.

2.Route Path나 link를 변수로 관리하지 않고 사용하는 곳마다 string으로 지정하면 유지보수가 힘들어 집니다.
*/
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_ARR } from "./routes";
const Router = () => {
  return (
    <>
      <Routes>
        {ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          );
        })}
      </Routes>
    </>
  );
};
export default Router;

import "./App.css";
import styled from "styled-components";
import Layout from "./sections/Layout";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d2daff;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Layout />
        {/* // <h1>Hello, Vite + React + Styled Components!</h1> */}
      </Wrapper>
    </>
  );
}

export default App;

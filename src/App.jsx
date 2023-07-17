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
      <Layout />
    </>
  );
}

export default App;

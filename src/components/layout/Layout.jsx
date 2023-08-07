import styled from "styled-components";

export const BaseLayout = ({ children}) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1024;
  margin: 0 auto;
  // background: black;
`
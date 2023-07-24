import styled from "styled-components";
import PlayCarousel from "./PlayCarousel";
function MainPage() {
  return (
    <MainContainer>
      <Container>
        <PlayCarousel />
      </Container>
    </MainContainer>
  );
}
const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin-top: 200px;
  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때의 스타일 */
    max-width: 90%;
  }
`;
const MainContent01 = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

export default MainPage;

import styled from "styled-components";
import PlayCarousel from "./PlayCarousel";
function MainPage() {
  return (
    <>
      <MainContainer>
        <p>메인페이지</p>
      </MainContainer>
    </>
  );
}
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin-top: 200px;
  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때의 스타일 */
    max-width: 90%;
  }
`;

export default MainPage;

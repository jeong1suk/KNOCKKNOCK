import styled from "styled-components";
function MainPage() {
  return (
    <>
      <MainContainer>
        <MainContent01>메인페이지</MainContent01>
      </MainContainer>
    </>
  );
}
const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
  margin-top: 200px;
`;
const MainContent01 = styled.div`
  display: flex;
  justify-content: flex-end;
  @media ${res.mobile} {
    margin: 6rem 0;
  }
`;

export default MainPage;

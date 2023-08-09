import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #fff;
  color: white;
  font-size: 0.8em;
  text-align: center;

  bottom: 0;
  left: 0;
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  @media (max-width: 880px) {
    /* 화면 너비가 768px 이하일 때 폰트 크기 조정 */

    display: none;
  }
`;

const FooterContent = styled.div`
  display: flex;
  // justify-content: space-between;

  align-items: center;
  color: #000;
  font-size: 0.8rem;

  & > div {
    flex: 1;

  }
`;
// const FooterContent = styled.div`
//   display: flex;
//   flex-direction: column; /* 변경: 내용을 세로로 정렬 */
//   align-items: center; /* 변경: 가운데로 정렬 */
//   color: white;
//   font-size: 0.8rem;
//   margin-bottom: 20px; /* 추가: 내용과 하단 간격 설정 */
// `;

const MemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const Member = styled.div`
  margin-top: 5px;
`

const FooterText = styled.div`
  display: flex;
  flex-direction: column; /*변경: 내용을 세로로 정렬*/
  // font-style: italic;
  font-weight: 600;
  text-align: center;
  color: #000;
  font-size: 0.8rem;
  /* padding-top: 1rem; */
  // margin-left: 1rem;
  // margin-right: 3rem;
`;

const FooterLink = styled.a`
  font-weight: 900;
  color: white;
  text-decoration: none;
`;
const Footer = () => {
  return (
    <FooterWrapper>
      <img
        src={"/006.png"}
        style={{
          width: "10%",
          height: "70%",
          marginTop: "30px",
          marginLeft: "40px",
          // maxWidth: "50%",
          // maxHeight: "50%",
        }}
      />
      <FooterContent>
        {/* <FooterText>KnockKnock</FooterText> */}
        {/* <FooterText>대표이사 억만추</FooterText>
        <FooterText>사업자등록번호 999-99-99999</FooterText>
        <FooterText>통신판매업신고번호 9999-999-999999</FooterText>
        <FooterText>엘리스랩</FooterText> */}

        <FooterText>
        KnockKnock
          <br />
          <br />
          뷰티톡톡
          <br />
          오늘의 낙낙
          <br />
          히히낙낙
          <br />
          마이페이지
        </FooterText>
        <MemberContainer>
          <FooterText>
            Member  
            <br />
            <br />
          </FooterText>
          <Member>
            이은석            github @enxxi
          </Member>
          <Member>
            정유진            깃허브
          </Member>
          <Member>
            정원석            깃허브
          </Member>
        </MemberContainer>
        <MemberContainer>
          <br />
          <br />
          <Member>
            정재훈            깃허브
          </Member>
          <Member>
            최우현            깃허브
          </Member>
          <Member>
            허창원            깃허브
          </Member>
        </MemberContainer>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

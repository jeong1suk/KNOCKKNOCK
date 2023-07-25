import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #000;
  padding-top: 10px;
  color: white;
  font-size: 0.8em;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
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

const FooterText = styled.p`
  font-style: italic;
  text-align: center;
  color: white;
  font-size: 0.8rem;
  padding-top: 30px;
`;

const FooterLink = styled.a`
  font-weight: 900;
  color: white;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <div>
          낙낙
          <br />
          대표이사 억만추
          <br />
          사업자등록번호 999-99-99999
          <br />
          통신판매업신고번호 9999-999-999999
          <br />
          엘리스랩
        </div>
        <div>
          이메일 상담 knockknock@ukman.chu
          <br />
          유선 상담 9999-9999
          <br />
          <FooterLink>© UkManChu Co., Ltd.</FooterLink>
        </div>
      </FooterContent>
      <FooterText>
        억만추는 통신판매중개자이며 통신판매 당사자가 아닙니다. 상품, 상품정보,
        거래에 관한 의무와 책임은 판매자에게 있으므로, 각 상품 페이지에서
        구체적인 내용을 확인하시기 바랍니다.
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;

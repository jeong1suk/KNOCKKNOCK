import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCarousel = styled.div`
  width: 70%;
  overflow: hidden;
`;

const CarouselItem = styled.div`
  img {
    display: block;
    width: 100%;
  }
`;

const PlayCarousel = () => {
  return (
    <CarouselContainer>
      <StyledCarousel>
        <CarouselItem>
          <a
            href="https://www.recycling-info.or.kr/act4r/main.do"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src={Banner1} alt="logo" /> */}
          </a>
        </CarouselItem>
        <CarouselItem>
          <a
            href="https://ecomileage.seoul.go.kr/home/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src={Banner2} alt="logo" /> */}
          </a>
        </CarouselItem>
        <CarouselItem>
          <a
            href="https://home.kepco.co.kr/kepco/KO/A/A/KOAAHP00101.do?menuCd=FN05"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <img src={Banner3} alt="logo" /> */}
          </a>
        </CarouselItem>
      </StyledCarousel>
    </CarouselContainer>
  );
};

export default PlayCarousel;

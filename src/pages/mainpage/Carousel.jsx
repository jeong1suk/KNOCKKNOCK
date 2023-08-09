import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      // centerMode: true,
      autoplay:true,
      autoplaySpeed: 2000,
      rtl: false,
      arrows: false,
    };
  
  
  return (
      <div>
        <StyledSlider {...settings}>
          <ImageContainer>
            <Link to="/play">
            <Image src="001.png"/>
            </Link>
          </ImageContainer>
          <ImageContainer>
            <Link to="/play">
            <Image src="012.png" />
            </Link>
          </ImageContainer>
          <ImageContainer>
          <Link to="/play">
            <Image src="002.png" />
            </Link>
          </ImageContainer>
          <ImageContainer>
          <Link to="/play">
            <Image src="011.png" />
            </Link>
          </ImageContainer>
        </StyledSlider>
      </div>
    );
  }

const StyledSlider = styled(Slider)`
  left: 0;
  height: 100%;
  width: 100%;  
  margin: 30px 0 40px 0;
  position: relative;
  
  .slick-dots li button::before {
    left: 3rem;
    color: #F48FB1
  }
  .slick-slide {
    margin: 30px 0 30px 0;
  }
  .slick-prev::before, .slick-next::before {
    font-size: 20px;
    color: #dfdfdf
  }
  // @media (max-width: 760px) {
  //   left: 0;
  //   width: 100%;
  // }
`;

const ImageContainer = styled.div`
  margin: auto;
`;

const Image = styled.img`
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  width: 18rem;
  @media (max-width: 760px) {
    width: 9rem;
    height: 12rem;
  }

  height: 25rem;
  max-width: 100%;
  max-height: 100%;
  background-color: #F7F6F0; 
  // @media (max-width: 400px) {
  //   width: 6rem;
  //   height: 15rem;
  // }
`;

export default Carousel;
import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function MainCarousel() {
  const slider = [
    { id: 0, bg: "001.png" },
    { id: 1, bg: "002.png" },
    { id: 2, bg: "005.png" },
    { id: 3, bg: "001.png" },
    { id: 4, bg: "002.png" },
    { id: 5, bg: "005.png" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: false, // Enable right-to-left mode
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {slider.map((val) => (
          <ImageContainer key={val.id}>
            <img src={val.bg} alt={val.bg} />
          </ImageContainer>
        ))}
      </Slider>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

const ImageContainer = styled.div`
  position: relative;
  margin: auto;
  margin-right: 30px;
  border: 1px solid #000;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  background-color: black;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
  }
`;

export default MainCarousel;

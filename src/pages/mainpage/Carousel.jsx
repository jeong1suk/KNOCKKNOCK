import React, { useState } from "react";
import styled from "styled-components";
function MainCarousel() {
  const slider = [
    { id: 0, bg: "001.png" },
    { id: 1, bg: "002.png" },
    { id: 2, bg: "005.png" },
  ];

  return (
    <>
      {slider.map((val) => (
        <ImageContainer key={val.id}>
          <img src={val.bg} alt={val.bg} />
        </ImageContainer>
      ))}
    </>
  );
}

const ImageContainer = styled.div`
  position: relative;
  margin: auto;
  border: 1px solid #000;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;
export default MainCarousel;

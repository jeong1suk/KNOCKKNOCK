import React, { useState } from "react";
import styled, { css } from "styled-components";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  ${(props) =>
    props.isHidden &&
    css`
      display: none;
    `}
`;

const ToggleContainer = styled.div`
  display: inline-block;
  /* border: 1px solid #ccc; */
  border-radius: 20px;
  /* padding: 4px; */
`;

const ToggleButton = styled.button`
  display: block;
  width: 200px;
  height: 40px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? "#5dd495" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Toggle = ({ children }) => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((prevValue) => !prevValue);
  };

  return (
    <CenteredDiv>
      <ToggleContainer>
        <ToggleButton active={isToggled} onClick={handleToggle}>
          {isToggled ? "닫기" : "선택입력 열기"}
        </ToggleButton>
      </ToggleContainer>
      <Wrapper isHidden={!isToggled}>{children}</Wrapper>
    </CenteredDiv>
  );
};

export default Toggle;

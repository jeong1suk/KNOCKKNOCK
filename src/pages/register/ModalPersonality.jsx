import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { personalityList } from "../../constants/registerConstants";
import { useToggle } from "../../components/hooks/useToggle";
export const ModalPersonality = ({ formData, handlePersonalityClick }) => {
  const { personality } = formData;
  const { opened, onOpen, onClose } = useToggle();

  return (
    <S.RightAlignedBox>
      <S.ToggleButton onClick={onOpen}>내가 생각하는 나</S.ToggleButton>
      {opened && (
        <S.Modal>
          <h3 style={{ textAlign: "center" }}>내 성격</h3>
          {personalityList.map((elements, index) => (
            <button
              key={index}
              style={{
                backgroundColor: personality.includes(elements)
                  ? "#87d5fc"
                  : "white",
                width: "6rem",
                height: "2rem",
                borderRadius: "2rem",
                padding: "10px",
                margin: "5px",
                border: "1px solid black",
                cursor: "pointer",
                fontSize: "0.7rem",
              }}
              onClick={() => handlePersonalityClick(elements)}
            >
              {elements}
            </button>
          ))}
          <button onClick={onClose}>Close</button>
        </S.Modal>
      )}
      {personality.length > 0 && (
        <S.HobbyBoxContainer>
          {personality.map((item, index) => (
            <PersonBox key={index} style={{ marginLeft: "20px" }}>
              {item}
            </PersonBox>
          ))}
        </S.HobbyBoxContainer>
      )}
    </S.RightAlignedBox>
  );
};
const PersonBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #87d5fc;
  /* margin: 0rem 0.5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

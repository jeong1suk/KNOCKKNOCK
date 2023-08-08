import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { personalityList } from "../../constants/registerConstants";
import { useToggle } from "../../components/hooks/useToggle";
import { isMaxArrayReached } from "../../util/arrayUtils";
export const ModalPersonality = ({ formData, handlePersonalityClick }) => {
  const { personality } = formData;
  const { opened, onOpen, onClose } = useToggle();
  const isMaxPersonalityReached = isMaxArrayReached(personality, 5);

  return (
    <>
      <S.ToggleButtonWrapper>
        <S.ToggleButton onClick={onOpen}>내가 생각하는 나</S.ToggleButton>
      </S.ToggleButtonWrapper>
      <S.Box>
        {opened && (
          <S.Modal>
            <h3 style={{ textAlign: "center" }}>내 성격</h3>
            {isMaxPersonalityReached && (
              <p style={{ color: "red" }}>
                You can only select up to 5 personality.
              </p>
            )}
            <ButtonContainer>
              {personalityList.map((elements, index) => (
                <ModalButton
                  key={index}
                  active={personality.includes(elements)}
                  onClick={() => handlePersonalityClick(elements)}
                >
                  <div style={{ textAlign: "center" }}>{elements}</div>
                </ModalButton>
              ))}
            </ButtonContainer>
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
      </S.Box>
    </>
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
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  flex: 1;
`;
const ModalButton = styled.div`
  background-color: ${({ active }) => (active ? "#fa9393" : "white")};
  width: 3.5rem;
  /* height: 2rem; */
  border-radius: 1rem;
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 0.7rem;
`;

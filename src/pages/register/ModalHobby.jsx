import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { hobbyList } from "../../constants/registerConstants";
export const ModalHobby = ({ formData, handleHobbyClick }) => {
  const { hobby } = formData;
  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  const openHobbyModal = () => {
    setIsHobbyModalOpen(true);
  };

  const closeHobbyModal = () => {
    setIsHobbyModalOpen(false);
  };
  return (
    <S.RightAlignedBox>
      <S.ToggleButton style={{ textAlign: "center" }} onClick={openHobbyModal}>
        취미 선택하기
      </S.ToggleButton>
      {isHobbyModalOpen && (
        <S.Modal>
          <h3 style={{ textAlign: "center" }}>취미</h3>
          {hobbyList.map((elements, index) => (
            <button
              key={index}
              style={{
                backgroundColor: hobby.includes(elements) ? "#fa9393" : "white",
                width: "5rem",
                height: "2rem",
                borderRadius: "2rem",
                padding: "10px",
                margin: "5px",
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => handleHobbyClick(elements)}
            >
              {elements}
            </button>
          ))}
          <button onClick={closeHobbyModal}>Close</button>
        </S.Modal>
      )}
      {hobby.length > 0 && (
        <S.HobbyBoxContainer>
          {hobby.map((item, index) => (
            <HobbyBox key={index} style={{ marginLeft: "20px" }}>
              {item}
            </HobbyBox>
          ))}
        </S.HobbyBoxContainer>
      )}
    </S.RightAlignedBox>
  );
};
const MultiCheckBox = styled.button`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const HobbyBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: #fa9393;
  /* margin: 0rem 0.5rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

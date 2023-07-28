import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import { idealList } from "../../constants/registerConstants";
export const ModalIdeal = ({ formData, handleIdealClick }) => {
  const { ideal } = formData;
  const [isIdealModalOpen, setIsIdealModalOpen] = useState(false);

  const openIdealModal = () => {
    setIsIdealModalOpen(true);
  };

  const closeIdealModal = () => {
    setIsIdealModalOpen(false);
  };
  return (
    <S.RightAlignedBox>
      <S.ToggleButton onClick={openIdealModal}>나의 이상형은?</S.ToggleButton>
      {isIdealModalOpen && (
        <S.Modal>
          <h3 style={{ textAlign: "center" }}>이상형</h3>
          {idealList.map((elements, index) => (
            <button
              key={index}
              style={{
                backgroundColor: ideal.includes(elements)
                  ? "rgb(248, 143, 255)"
                  : "white",
                width: "5rem",
                height: "2rem",
                borderRadius: "2rem",
                padding: "10px",
                margin: "5px",
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={() => handleIdealClick(elements)}
            >
              {elements}
            </button>
          ))}
          <button onClick={closeIdealModal}>Close</button>
        </S.Modal>
      )}
      {ideal.length > 0 && (
        <S.HobbyBoxContainer>
          {ideal.map((item, index) => (
            <IdealBox key={index} style={{ marginLeft: "20px" }}>
              {item}
            </IdealBox>
          ))}
        </S.HobbyBoxContainer>
      )}
    </S.RightAlignedBox>
  );
};

const IdealBox = styled.div`
  width: 3.8rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: rgb(248, 143, 255);
  /* margin: 0rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.7rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

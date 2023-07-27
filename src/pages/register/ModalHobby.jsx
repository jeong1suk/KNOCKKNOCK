import React, { useState } from "react";
import * as S from "./style";
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
      <S.Heading onClick={openHobbyModal}>취미</S.Heading>
      {isHobbyModalOpen && (
        <S.Modal>
          {hobbyList.map((elements, index) => (
            <button
              key={index}
              style={{
                backgroundColor: hobby.includes(elements)
                  ? "#61dafbaa"
                  : "white",
                padding: "10px",
                margin: "5px",
                borderRadius: "5px",
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
        <div>
          {hobby.map((item, index) => (
            <span key={index} style={{ marginLeft: "20px" }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </S.RightAlignedBox>
  );
};

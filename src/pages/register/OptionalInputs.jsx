import React, { useState } from "react";
import * as S from "./style";
import {
  mbtiList,
  idealList,
  hobbyList,
  personalityList,
} from "../../constants/registerConstants";
const OptionalInputs = ({ formData, setFormData }) => {
  const { mbti, religion, height, hobby, personality, ideal, introduce } =
    formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onArrayChange = (array, element, arrayPropertyName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayPropertyName]: array.includes(element)
        ? array.filter((e) => e !== element)
        : [...array, element],
    }));
  };

  const handleHobbyClick = (element) => {
    onArrayChange(hobby, element, "hobby");
  };

  const handlePersonalityClick = (element) => {
    onArrayChange(personality, element, "personality");
  };

  const handleIdealClick = (element) => {
    onArrayChange(ideal, element, "ideal");
  };
  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [isIdealModalOpen, setIsIdealModalOpen] = useState(false);
  const openHobbyModal = () => {
    setIsHobbyModalOpen(true);
  };

  const closeHobbyModal = () => {
    setIsHobbyModalOpen(false);
  };

  const openPersonalityModal = () => {
    setIsPersonalityModalOpen(true);
  };

  const closePersonalityModal = () => {
    setIsPersonalityModalOpen(false);
  };

  const openIdealModal = () => {
    setIsIdealModalOpen(true);
  };

  const closeIdealModal = () => {
    setIsIdealModalOpen(false);
  };
  return (
    <>
      <S.RightAlignedBox style={{ marginTop: "20px" }}>
        <S.Heading>종교</S.Heading>
        <S.Select
          name="religion"
          value={religion}
          onChange={onChange}
          style={{ flex: 1, textAlign: "right" }}
        >
          <option>종교</option>
          <option key="기독교">기독교</option>
          <option key="천주교">천주교</option>
          <option key="불교">불교</option>
          <option key="없음">없음</option>
        </S.Select>
      </S.RightAlignedBox>

      <S.Box>
        <S.Heading>키</S.Heading>
        <S.Input
          name="height"
          value={height}
          onChange={onChange}
          style={{ marginLeft: "30px", textAlign: "right" }}
        />
      </S.Box>
      <S.Box>
        <S.Heading>MBTI</S.Heading>
        <S.Select
          name="mbti"
          value={mbti}
          onChange={onChange}
          style={{ textAlign: "right" }}
        >
          <option>MBTI</option>
          {mbtiList.map((mbti) => (
            <option key={mbti} value={mbti}>
              {mbti}
            </option>
          ))}
        </S.Select>
      </S.Box>
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

      <S.RightAlignedBox>
        <S.Heading onClick={openPersonalityModal}>내가 생각하는 나</S.Heading>
        {isPersonalityModalOpen && (
          <S.Modal>
            {personalityList.map((elements, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: personality.includes(elements)
                    ? "#61dafbaa"
                    : "white",
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "5px",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                onClick={() => handlePersonalityClick(elements)}
              >
                {elements}
              </button>
            ))}
            <button onClick={closePersonalityModal}>Close</button>
          </S.Modal>
        )}
        {personality.length > 0 && (
          <div>
            {personality.map((item, index) => (
              <span key={index} style={{ marginLeft: "20px" }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </S.RightAlignedBox>
      <S.RightAlignedBox>
        <S.Heading onClick={openIdealModal}>나의 이상형은?</S.Heading>
        {isIdealModalOpen && (
          <S.Modal>
            {idealList.map((elements, index) => (
              <button
                key={index}
                style={{
                  backgroundColor: ideal.includes(elements)
                    ? "#61dafbaa"
                    : "white",
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "5px",
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
          <div>
            {ideal.map((item, index) => (
              <span key={index} style={{ marginLeft: "20px" }}>
                {item}
              </span>
            ))}
          </div>
        )}
      </S.RightAlignedBox>

      <S.Heading>한줄 자기소개</S.Heading>
      <S.Box>
        <S.Input name="introduce" value={introduce} onChange={onChange} />
      </S.Box>
    </>
  );
};

export default OptionalInputs;

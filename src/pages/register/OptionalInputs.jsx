import React, { useState } from "react";
import * as S from "./style";
import { mbtiList } from "../../constants/registerConstants";
import { ModalHobby } from "./ModalHobby";
import { ModalPersonality } from "./ModalPersonality";
import { ModalIdeal } from "./ModalIdeal";
const OptionalInputs = () => {
  const [formData, setFormData] = useState({
    height: "",
    mbti: "",
    hobby: [],
    personality: [],
    ideal: [],
    introduce: "", //아무값도 있지 않으면 OptionalInputs.getFormData이게 return을 못받아서 오류가 뜸.
  });
  const { height, mbti, hobby, personality, ideal, introduce } = formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onArrayChange = (array, element, arrayPropertyName, maxLimit) => {
    setFormData((prev) => {
      const newArray = array.includes(element)
        ? array.filter((e) => e !== element)
        : [...array, element];

      if (newArray.length > maxLimit) {
        newArray.splice(maxLimit);
      }
      return {
        ...prev,
        [arrayPropertyName]: newArray,
      };
    });
  };

  const handleHobbyClick = (element) => {
    onArrayChange(hobby, element, "hobby", 5);
  };

  const handlePersonalityClick = (element) => {
    onArrayChange(personality, element, "personality", 5);
  };

  const handleIdealClick = (element) => {
    onArrayChange(ideal, element, "ideal", 5);
  };
  OptionalInputs.getFormData = () => {
    return formData;
  };

  return (
    <>
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
      <ModalHobby formData={formData} handleHobbyClick={handleHobbyClick} />
      <ModalPersonality
        formData={formData}
        handlePersonalityClick={handlePersonalityClick}
      />
      <ModalIdeal formData={formData} handleIdealClick={handleIdealClick} />

      <S.Heading>한줄 자기소개</S.Heading>
      <S.Box>
        <S.Input name="introduce" value={introduce} onChange={onChange} />
      </S.Box>
    </>
  );
};

export default OptionalInputs;

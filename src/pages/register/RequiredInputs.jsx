import React, { useState } from "react";
import * as S from "./style";
import styled from "styled-components";
import ValidationFields from "./ValidationFields";

import { regions } from "../../constants/registerConstants";
const RequiredInputs = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthdate: "",
    gender: "",
    job: "",
    region: "",
  });
  const { name, nickname, birthdate, gender, job, region } = formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    const newValue = name === "birthdate" ? formatDate(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  RequiredInputs.getFormData = () => {
    return formData;
  };
  // console.log("필수");
  return (
    <>
      <S.Heading>이름</S.Heading>
      <S.Box>
        <S.Input name="name" value={name} onChange={onChange} />
      </S.Box>
      <S.Heading>닉네임</S.Heading>
      <S.Box>
        <S.Input name="nickname" value={nickname} onChange={onChange} />
      </S.Box>
      <ValidationFields
        formData={formData}
        setFormData={setFormData}
        onChange={onChange}
      />
      <S.RightAlignedBox style={{ marginTop: "20px" }}>
        <S.Heading>성별</S.Heading>
        <S.Select
          name="gender"
          value={gender}
          onChange={onChange}
          style={{ flex: 1, textAlign: "right" }}
        >
          <option>성별</option>
          <option value="남">남자</option>
          <option value="여">여자</option>
        </S.Select>
      </S.RightAlignedBox>

      <S.Heading>생년월일</S.Heading>
      <S.Box>
        <S.Input
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={onChange}
        />
      </S.Box>

      <S.Heading>직업</S.Heading>
      <S.Box>
        <S.Input name="job" value={job} onChange={onChange} />
      </S.Box>
      <S.Heading>지역</S.Heading>
      <S.RightAlignedBox style={{ marginTop: "20px" }}>
        <S.Select
          name="region"
          value={region}
          onChange={onChange}
          style={{ flex: 1, textAlign: "right" }}
        >
          <option>지역</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </S.Select>
      </S.RightAlignedBox>
    </>
  );
};

export default RequiredInputs;

const StyledLabel = styled.label`
  display: flex;
  font-weight: bold;
  margin-right: 10px;
  width: 15%;
`;
const StyledInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: solid 1px #ccc;
  padding: 20px 0px 5px 0px;
  font-size: 14pt;
  width: 50%;

  &:placeholder-shown + ${StyledLabel} {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }

  &:focus + ${StyledLabel} {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transform: translateY(-100%);
    opacity: 1;
  }

  &:not(:placeholder-shown) + ${StyledLabel} {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transform: translateY(-100%);
    opacity: 1;
  }

  &:focus,
  &:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
`;

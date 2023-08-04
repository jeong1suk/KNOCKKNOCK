import React, { useState } from "react";
import * as S from "./style";

import ValidationFields from "./ValidationFields";
import { regions } from "../../constants/registerConstants";
const today = new Date().toISOString().split("T")[0];
const RequiredInputs = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    job: "",
    region: "",
  });
  const { name, nickname, gender, job, region } = formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      {/* <BirthDateForm birthdate={formData.birthdate} onChange={onChange} /> */}
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

      <S.Heading>직업</S.Heading>
      <S.Box>
        <S.Input name="job" value={job} onChange={onChange} />
      </S.Box>
      <S.RightAlignedBox style={{ marginTop: "20px" }}>
        <S.Heading>지역</S.Heading>
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

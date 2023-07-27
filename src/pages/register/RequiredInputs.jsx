import React, { useState } from "react";
import * as S from "./style";
import { validateEmail, validatePassword } from "../../util/common";
import { BiHide, BiShow } from "react-icons/bi";
const today = new Date().toISOString().split("T")[0];
const allRegions = [
  "서울특별시",
  "경기도",
  "인천광역시",
  // ... (전체 지역 목록에 대한 나머지 항목들)
];
const RequiredInputs = ({ formData, setFormData }) => {
  const {
    name,
    nickname,
    email,
    password,
    confirmPwd,
    gender,
    birthdate,
    job,
    region,
  } = formData;

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPwd;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };
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
      <S.Heading>이메일</S.Heading>
      <S.Box>
        <S.Input name="email" value={email} onChange={onChange} />
      </S.Box>
      {!isEmailValid && email.length > 0 && (
        <S.ErrorBox>올바른 이메일을 입력해주세요.</S.ErrorBox>
      )}

      <S.Heading>비밀번호</S.Heading>
      <S.Box>
        <S.Input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={onChange}
        />

        {showPassword ? (
          <BiHide className="pswdIcon" onClick={togglePasswordVisibility} />
        ) : (
          <BiShow className="pswdIcon" onClick={togglePasswordVisibility} />
        )}
      </S.Box>
      {!isPasswordValid && password.length > 0 && (
        <S.ErrorBox>숫자, 문자, 특수문자 포함 8글자 이상</S.ErrorBox>
      )}

      <S.Heading>비밀번호 확인</S.Heading>
      <S.Box>
        <S.Input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPwd"
          value={confirmPwd}
          onChange={onChange}
        />
        {showPassword ? (
          <BiHide
            className="pswdIcon"
            onClick={toggleConfirmPasswordVisibility}
          />
        ) : (
          <BiShow
            className="pswdIcon"
            onClick={toggleConfirmPasswordVisibility}
          />
        )}
      </S.Box>
      {!isPasswordSame && isPasswordValid && (
        <S.ErrorBox>비밀번호가 다릅니다.</S.ErrorBox>
      )}

      {/* <BirthDateForm birthdate={formData.birthdate} onChange={onChange} /> */}
      <S.Heading>생년월일</S.Heading>
      <S.Box>
        <S.Input
          max={today}
          name="birthdate"
          value={birthdate}
          onChange={onChange}
        />
      </S.Box>
      <S.RightAlignedBox style={{ marginTop: "20px" }}>
        <S.Heading>성별</S.Heading>
        <S.Select
          name="gender"
          value={gender}
          onChange={onChange}
          style={{ flex: 1, textAlign: "right" }}
        >
          <option>성별</option>
          <option value="M">남자</option>
          <option value="F">여자</option>
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
          {allRegions.map((region) => (
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

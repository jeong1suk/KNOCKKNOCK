import React, { useState } from "react";
import * as S from "./style";
import {
  validateEmail,
  validatePassword,
  validateDate,
} from "../../util/common";
import { BiHide, BiShow } from "react-icons/bi";

const ValidationFields = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPwd: "",
    birthdate: "",
  });
  const { email, password, confirmPwd, birthdate } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isPasswordSame = password === confirmPwd;
  const isBirthdateValid = validateDate(birthdate);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  ValidationFields.getFormData = () => {
    return formData;
  };
  // console.log("유효성");
  return (
    <>
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
        {showConfirmPassword ? (
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

      <S.Heading>생년월일</S.Heading>
      <S.Box>
        <S.Input name="birthdate" value={birthdate} onChange={onChange} />
      </S.Box>
      {!isBirthdateValid && birthdate.length > 0 && (
        <S.ErrorBox>YYYY-MM-DD형태로 입력해주세요.</S.ErrorBox>
      )}
    </>
  );
};

export default ValidationFields;

import React, { useState } from "react";
import RequiredInputs from "./RequiredInputs";
import OptionalInputs from "./OptionalInputs";
import * as S from "./style";
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPwd: "",
    gender: "",
    birthdate: "",
    job: "",
    region: "",
    mbti: "",
    height: "",
    hobby: [],
    personality: [],
    ideal: [],
    introduce: "",
  });

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleRegistration = () => {
    console.log(formData);
    /**try {
      await Api.post("users/register", {
        name,
        email,
        nickname,
        user_password: password,
        gender,
        birthday: birthdate,
        job,
        region,
        mbti,
        height,
        hobby,
        personality,
        introduce,
      });
      // 로그인 페이지로 이동함.
      const res = await Api.post("users/login", {
        email,
        password,
      });

      const user = res.data;
      const jwtToken = user.token;

      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", user.userId);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      if (err.response.data.message) {
        console.log(err.response.data.message);
      } else {
        console.log("라우팅 경로가 잘못되었습니다.");
      }
    }
 */
  };

  return (
    <S.Content>
      <S.HeaderContainer>
        <S.Header onClick={() => handlePrevStep()}>필수 입력</S.Header>
        <S.Header style={{ border: 0 }}>Register</S.Header>
        <S.Header onClick={() => handleNextStep()}>선택 입력</S.Header>
      </S.HeaderContainer>
      {step === 1 && (
        <RequiredInputs
          formData={{
            name: formData.name,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            confirmPwd: formData.confirmPwd,
            gender: formData.gender,
            birthdate: formData.birthdate,
            job: formData.job,
            region: formData.region,
          }}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <OptionalInputs
          formData={{
            mbti: formData.mbti,
            religion: formData.religion,
            height: formData.height,
            hobby: formData.hobby,
            personality: formData.personality,
            ideal: formData.ideal,
            introduce: formData.introduce,
          }}
          setFormData={setFormData}
        />
      )}
      {step === 1 && (
        <S.JoinButton onClick={() => handleNextStep()}>Next</S.JoinButton>
      )}
      {step === 2 && (
        <S.JoinButton onClick={() => handlePrevStep()}>Prev</S.JoinButton>
      )}
      <S.JoinButton onClick={handleRegistration}>Register</S.JoinButton>
    </S.Content>
  );
};

export default RegisterPage;

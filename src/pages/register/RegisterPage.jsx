import React, { useState, useContext } from "react";
import RequiredInputs from "./RequiredInputs";
import OptionalInputs from "./OptionalInputs";
import * as S from "./style";
import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ValidationFields from "./ValidationFields";
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleRegistration = async (formData) => {
    try {
      // console.log(formData);
      await Api.post("users/register", {
        name: formData.name,
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
        gender: formData.gender,
        birthday: formData.birthdate,
        job: formData.job,
        region: formData.region,
        mbti: formData.mbti,
        height: formData.height,
        hobby: formData.hobby,
        personality: formData.personality,
        introduce: formData.introduce,
      });
      // 로그인 페이지로 이동함.
      const res = await Api.post("users/login", {
        email: formData.email,
        password: formData.password,
      });

      const user = res.data;
      const jwtToken = user.token;

      localStorage.setItem("userToken", jwtToken);
      // localStorage.setItem("userId", user.userId);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      if (err.response.data.message) {
        alert(err.response.data.message);
        console.log(err.response.data.message);
      } else {
        console.log("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  return (
    <S.Content>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegistration({
            ...RequiredInputs.getFormData(),
            ...ValidationFields.getFormData(),
            ...OptionalInputs.getFormData(), //아무값도 return을 받지 않으면 안됨. 왜지?
          });
        }}
      >
        <S.HeaderContainer>
          <S.Header onClick={() => handlePrevStep()}>필수 입력</S.Header>
          <S.Header style={{ border: 0 }}>Register</S.Header>
          <S.Header onClick={() => handleNextStep()}>선택 입력</S.Header>
        </S.HeaderContainer>
        {step === 1 && <RequiredInputs />}
        {step === 2 && <OptionalInputs />}
        {step === 1 && (
          <S.JoinButton onClick={handleNextStep}>Next</S.JoinButton>
        )}
        {step === 2 && (
          <S.JoinButton onClick={handlePrevStep}>Prev</S.JoinButton>
        )}
        <S.JoinButton type="submit">Register</S.JoinButton>
      </form>
    </S.Content>
  );
};

export default RegisterPage;

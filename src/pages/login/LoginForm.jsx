import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./style";
import * as Api from "../../api";
import { DispatchContext } from "../../App";
import { validateEmail, validatePassword } from "../../util/common";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isFormValid = isEmailValid && isPasswordValid;

  const login = async ({ email, password }) => {
    const result = await Api.post("users/login", {
      email,
      password,
    });
    return result.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ email, password });
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", user.userId);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <S.GradientBackground>
      <S.Container>
        <S.Header>Login</S.Header>
        <S.Form onSubmit={handleSubmit}>
          <S.InputBox>
            <input
              id="email"
              type="text"
              name="username"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderBottomColor: email
                  ? isEmailValid
                    ? "#ccc"
                    : "red"
                  : "#ccc",
              }}
            />
            <label htmlFor="username">이메일</label>
          </S.InputBox>
          <br />
          <S.InputBox>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderBottomColor: password
                  ? isPasswordValid
                    ? "#ccc"
                    : "red"
                  : "#ccc",
              }}
            />
            <label htmlFor="password">비밀번호</label>
          </S.InputBox>
          <br />
          <S.Forgot>회원가입</S.Forgot>
          <S.SubmitButton
            type="submit"
            value="로그인"
            disabled={!isFormValid}
          />
        </S.Form>
      </S.Container>
    </S.GradientBackground>
  );
}

export default LoginForm;

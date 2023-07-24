import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from "../../api";
import { DispatchContext } from "../../App";

import ValidateEmail from '../../util/ValidateEmail';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = ValidateEmail(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const login = async({ email, password }) => {
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
      localStorage.setItem('userId', user.userId);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
      alert("로그인에 실패하였습니다.");
    }
  };

  return(
    <Form>
      <Input 
        type='email'
        placeholder='이메일'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input 
        type='password'
        placeholder='비밀번호'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button disabled={!isFormValid} onClick={handleSubmit}>
        로그인
      </Button>
    </Form>
  );
}

export default LoginForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  margin: 200px auto;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  background-color: skyblue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
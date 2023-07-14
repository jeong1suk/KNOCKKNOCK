import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';



function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [image, setImage] = useState('');
  const [mbti, setMbti] = useState('');
  const [religion, setReligion] = useState('');
  const [height, setHeight] = useState('');
  const [hobby, setHobby] = useState('');
  const [personality, setPersonality] = useState('');
  const [ideal, setIdeal] = useState('');
  const [introduce, setIntroduce] = useState('');


  const validateEmail = email => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 10;
  const isPasswordSame = password === confirmPassword;
  const isNicknameValid = nickname.length >= 2;

  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid;

  return (
    <div>
      <StyledLabel>이름</StyledLabel>
      <StyledInput type="text" value={name} onChange={e => setName(e.target.value)} required />
  
      <StyledLabel>닉네임</StyledLabel>
      <StyledInput type="text" value={nickname} onChange={e => setNickname(e.target.value)} required />
  
      <StyledLabel>이메일</StyledLabel>
      <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} required />
  
      <StyledLabel>비밀번호</StyledLabel>
      <StyledInput type="password" value={password} onChange={e => setPassword(e.target.value)} required />
  
      <StyledLabel>비밀번호 확인</StyledLabel>
      <StyledInput type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
  
      <StyledLabel>성별</StyledLabel>
      <StyledInput type="text" value={gender} onChange={e => setGender(e.target.value)} required />
  
      <StyledLabel>생년월일</StyledLabel>
      <StyledInput type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
  
      <StyledLabel>대표사진</StyledLabel>
      <StyledInput type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
  
      <StyledLabel>MBTI</StyledLabel>
      <StyledInput type="text" value={mbti} onChange={e => setMbti(e.target.value)} />
  
      <StyledLabel>종교</StyledLabel>
      <StyledInput type="text" value={religion} onChange={e => setReligion(e.target.value)} />
  
      <StyledLabel>키</StyledLabel>
      <StyledInput type="number" value={height} onChange={e => setHeight(e.target.value)} />
  
      <StyledLabel>취미</StyledLabel>
      <StyledInput type="text" value={hobby} onChange={e => setHobby(e.target.value)} />
  
      <StyledLabel>내가 생각하는 나</StyledLabel>
      <StyledInput type="text" value={personality} onChange={e => setPersonality(e.target.value)} />
  
      <StyledLabel>내가 좋아하는 상대</StyledLabel>
      <StyledInput type="text" value={ideal} onChange={e => setIdeal(e.target.value)} />
  
      <StyledLabel>자기소개</StyledLabel>
      <StyledInput type="text" value={introduce} onChange={e => setIntroduce(e.target.value)} />
  
      <div style={{display: "flex", flexDirection: "column",
  alignItems: "center"}}>
        <div style={{display: "flex"}}>
          <StyledButton style={{marginRight: "10px"}} onClick={() => navigate('/login')}>로그인</StyledButton>
          <StyledButton disabled={!isFormValid} onClick={() => navigate('/login')}>회원가입</StyledButton>
        </div>  
      </div>
      
    </div>
  );
  
}

export default RegisterForm;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;


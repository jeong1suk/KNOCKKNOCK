import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import TextareaAutosize from 'react-textarea-autosize';

import Modal from '../../components/modal/Modal';

import styled from 'styled-components';


function RegisterForm() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];


  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [job, setJob] = useState('');

  const [image, setImage] = useState('');
  const [mbti, setMbti] = useState('');
  const [religion, setReligion] = useState('');
  const [height, setHeight] = useState('');
  const [hobby, setHobby] = useState([]);
  const [personality, setPersonality] = useState([]);
  const [ideal, setIdeal] = useState([]);
  const [introduce, setIntroduce] = useState('');

  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [isIdealModalOpen, setIsIdealModalOpen] = useState(false);

  console.log(hobby);
  const hobbyList = [
    "영화", "코인노래방", "맥주", "카페",
    "쇼핑", "독서", "맛집탐방", "여행",
    "등산", "러닝", "산책", "댄스",
    "골프", "헬스", "필라테스", "홈트레이닝",
    "클라이밍", "자전거라이딩", "캠핑", "공부",
    "볼링", "요리", "그림그리기", "음악듣기",
    "악기연주", "사진찍기", "웹툰", "게임",
    "전시회관람", "봉사활동", "드라이브"
  ]
  const personalityList = [
    "예쁘고 잘생긴", "옷 잘입는", "듬직한", "아담한",
    "말이 잘 통하는", "잘 웃어주는", "욕 안하는", "목소리가 좋은",
    "먼저 말걸어주는", "잘 들어주는"
  ];
  const idealList = [
    "예쁘고 잘생긴", "옷 잘입는", "듬직한", "아담한",
    "말이 잘 통하는", "잘 웃어주는", "욕 안하는", "목소리가 좋은",
    "먼저 말걸어주는", "잘 들어주는", "연상", "연하", "동갑", "취미가 같은"
  ];


  const GenderButton = ({ color, label, gender, setGender }) => {
    const isSelected = gender === label;
  
    return (
      <StyledGenderButton
        color={isSelected ? color : 'white'}
        selectedColor={color}
        onClick={() => setGender(label)}
      >
        {label}
      </StyledGenderButton>
    )
  }

  const handleHobbyClick = (element) => {
    if (hobby.includes(element)) {
      setHobby(personality.filter(e => e !== element));
    } else {
      setHobby([...hobby, element])
    }
  }

  const handlePersonalityClick = (element) => {
    if (personality.includes(element)) {
      setPersonality(personality.filter(e => e !== element));
    } else {
      setPersonality([...personality, element]);
    }
  };

  const handleIdealClick = (element) => {
    if (ideal.includes(element)) {
      setIdeal(ideal.filter(e => e !== element));
    } else {
      setIdeal([...ideal, element]);
    }
  };

  const handleConfirmHobby = () => {
    setIsHobbyModalOpen(false);
  };

  const handleConfirmPersonality = () => {
    setIsPersonalityModalOpen(false);
  };

  const handleComfirmIdeal = () => {
    setIsIdealModalOpen(false);
  };

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
      <Wrapper>
        <LabelInput>
          <StyledLabel>이름</StyledLabel>
          <StyledInput type="text" value={name} onChange={e => setName(e.target.value)} required />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>닉네임</StyledLabel>
          <StyledInput type="text" value={nickname} onChange={e => setNickname(e.target.value)} required />
        </LabelInput>
    
        <LabelInput>
          <StyledLabel>이메일</StyledLabel>
          <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </LabelInput>
    
        <LabelInput>
          <StyledLabel>비밀번호</StyledLabel>
          <StyledInput type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>비밀번호 확인</StyledLabel>
          <StyledInput type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>성별</StyledLabel>
          <GenderButton color="blue" label="남자" gender={gender} setGender={setGender} />
          <GenderButton color="red" label="여자" gender={gender} setGender={setGender} />
        </LabelInput>
                
        <LabelInput>
          <StyledLabel>생년월일</StyledLabel>
          <StyledInput type="date" value={birthdate} max={today} onChange={e => setBirthdate(e.target.value)} required />
        </LabelInput>

        <LabelInput>
          <StyledLabel>직업</StyledLabel>
          <StyledInput type="text" value={job} onChange={e => setJob(e.target.value)} required />
        </LabelInput>
        
      </Wrapper>
      <Wrapper>
        <LabelInput>
          <StyledLabel>대표사진</StyledLabel>
          <StyledInput type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>MBTI</StyledLabel>
          <StyledInput type="text" value={mbti} onChange={e => setMbti(e.target.value)} />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>종교</StyledLabel>
          <StyledInput type="text" value={religion} onChange={e => setReligion(e.target.value)} />
        </LabelInput>
        
        <LabelInput>
          <StyledLabel>키</StyledLabel>
          <StyledInput type="text" value={height} onChange={e => setHeight(e.target.value)} />
        </LabelInput>
        


        <LabelInput style={{justifyContent: "center"}}>
          <ModalButton style={{marginRight : "10px"}} onClick={() => setIsHobbyModalOpen(true)}>취미</ModalButton>
          <ModalButton style={{marginRight : "10px"}} onClick={() => setIsPersonalityModalOpen(true)}>내가 생각하는 나</ModalButton>
          <ModalButton onClick={() => setIsIdealModalOpen(true)}>내가 좋아하는 상대</ModalButton>
        </LabelInput>
        {isHobbyModalOpen && (
        <Modal onClose={() => setIsHobbyModalOpen(false)}>
          <h2>취미는?</h2>
          <p>2개 이상 선택하세요</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {hobbyList.map((element, index) => (
              <button
              key={index}
              style={{
                backgroundColor: hobby.includes(element) ? '#61dafbaa' : 'white',
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                border: '1px solid black',
                cursor: 'pointer',
              }}
              onClick={() => handleHobbyClick(element)}
            >
              {element}
            </button>
            ))}
          </div>
          <button onClick={handleConfirmHobby}>확인</button>
          </Modal>
          )}

        {isPersonalityModalOpen && (
        <Modal onClose={() => setIsPersonalityModalOpen(false)}>
          <h2>내가 생각하는 나는?</h2>
          <p>2개 이상 선택하세요</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {personalityList.map((element, index) => (
              <button
              key={index}
              style={{
                backgroundColor: personality.includes(element) ? '#61dafbaa' : 'white',
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                border: '1px solid black',
                cursor: 'pointer',
              }}
              onClick={() => handlePersonalityClick(element)}
            >
              {element}
            </button>
            ))}
          </div>
          <button onClick={handleConfirmPersonality}>확인</button>
          </Modal>
          )}

          {isIdealModalOpen && (
          <Modal onClose={() => setIsIdealModalOpen(false)}>
            <h2>내가 좋아하는 상대는?</h2>
            <p>2개 이상 선택하세요</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {idealList.map((element, index) => (
                <button
                key={index}
                style={{
                  backgroundColor: ideal.includes(element) ? '#61dafbaa' : 'white',
                  padding: '10px',
                  margin: '5px',
                  borderRadius: '5px',
                  border: '1px solid black',
                  cursor: 'pointer',
                }}
                onClick={() => handleIdealClick(element)}
              >
                {element}
              </button>
              ))}
            </div>
            <button onClick={handleComfirmIdeal}>확인</button>
            </Modal>
            )}
        
        
        <StyledLabel>자기소개</StyledLabel>
        <StyledTextareaAutosize minRows={3} value={introduce} onChange={e => setIntroduce(e.target.value)} />
      </Wrapper>
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
  margin-right: 10px;
  width: 100px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding : 20px;
  border: 1px solid black;
  border-radius: 10px;
  width: 50vw;
  margin: 50px auto 0 auto;
`

const  LabelInput = styled.div`
  display:flex;
  align-items: center;
  padding : 10px;
  width: 80%;
`

const StyledGenderButton = styled.button`
  padding: 10px;
  background-color: ${props => props.color};
  color: ${props => (props.color === 'white' ? 'black' : 'white')};
  border: 2px solid ${props => props.selectedColor};
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;

const StyledTextareaAutosize = styled(TextareaAutosize)`
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #FFFFFF;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`
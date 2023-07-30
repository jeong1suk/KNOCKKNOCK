import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import * as Api from '../../api';

import { categories } from '../../constants/CategoryConstants';
import { useImageUpload } from '../../components/hooks/UseImageUpload';

import TextareaAutosize from 'react-textarea-autosize';

import styled from 'styled-components';

function PlayEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.match(/\/playedit\/(\d+)/)[1];

  const [postTitle, setPostTitle] = useState('');
  const [postType, setPostType] = useState('술');
  const [customType, setCustomType] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingHour, setMeetingHour] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [imageUrl, handleImageUpload] = useImageUpload();
  const [totalM, setTotalM] = useState(0);
  const [totalF, setTotalF] = useState(0);
  const [place, setPlace] = useState('');
  const [postContent, setPostContent] = useState('');


  const getPostRequest = async (postId) => {
    try {
      const res = await Api.get(`/posts/${postId}`);
      const postData = res.data.post;
      setPostTitle(postData.title);
      setPostType(postData.type);
      setCustomType(postData.type);
      setMeetingTime(postData.meetingTime);
      handleImageUpload(UserUserFiles.File);
      setTotalM(postData.totalM);
      setTotalM(postData.totalF);
      setPlace(postData.place);
      setPostContent(postData.content);
    } catch (err) {
      if (err.response.data.message) {
          alert(err.response.data.message);
      } else {
          alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }


  const handleCategoryChange = (e) => {
    setPostType(e.target.value);
    if(e.target.value !== '기타') {
      setCustomType('');
    }
  }


  const handlePostSubmit = async e => {
    e.preventDefault();

    try {
      // await Api.post('posts', formData);
      await Api.post('posts', {
        title: postTitle,
        content: postContent,
        type: postType,
        totalM: totalM,
        totalF: totalF,
        place,
        meetingTime: meetingTime
      })
      navigate('/play');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
      } else {
          alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }

  useEffect(() => {
    if (meetingDate && meetingHour) {
      setMeetingTime(`${meetingDate} ${meetingHour}`);
    }
  }, [meetingDate, meetingHour]);

  useEffect(() => {
    getPostRequest(postId);
}, [getPostRequest]);

  return (
    <>
      <TopBox>
        <p>같이 놀자!</p>
        <p>여러분이 원하는 만남을 만들어보세요</p>
      </TopBox>
      <PostAddBox>
        <InputBox>
          <StyledLabel>제목</StyledLabel>
          <StyledInput style={{width: "81%"}} type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} required />
        </InputBox>
        <InputBox>
          <StyledLabel>카테고리</StyledLabel>
          <StyledSelect value={postType} onChange={handleCategoryChange} required>
            {categories.map((category, index) => 
              <option key={index} value={category}>{category}</option>
            )}
          </StyledSelect>
          {postType === '기타' && 
            <StyledInput type="text" value={customType} onChange={e => setCustomType(e.target.value)} placeholder="직접 입력" required />
          }
        </InputBox>
        <InputBox>
          <StyledLabel style={{paddingLeft : "10px"}}>날짜/시간</StyledLabel>
          <StyledInput style={{margin: "0 10px 0 10px"}} type="date" onChange={e => setMeetingDate(e.target.value)} required />
          <StyledInput type="time" onChange={e => setMeetingHour(e.target.value)} required />
        </InputBox>
        <InputBox>
          <StyledLabel>대표사진</StyledLabel>
          <div style={{display: "flex", flexDirection: "column"}}>
            <input
                id="imageUpload"
                type="file"
                onChange={e => {
                    handleImageUpload(e);
                }}
                className="hidden w-full h-full"
            />
          </div>
        </InputBox>
        <InputBox>
        {imageUrl && (
              <div style={{ width: '200px', paddingLeft: "130px" }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} id="preview" alt="Preview" />
              </div>
            )}
        </InputBox>
        <InputBox>
          <StyledLabel>모집인원</StyledLabel>
          <GenderSelectBox>
            <span style={{marginRight: "10px"}}>남자</span>
            <StyledInput style={{width: "10%", marginRight: "10px"}} type="text" value={totalM} onChange={e => setTotalM(e.target.value)} required />
            <span style={{marginRight: "10px"}}>여자</span>
            <StyledInput style={{width: "10%"}} type="text" value={totalF} onChange={e => setTotalF(e.target.value)} required />
          </GenderSelectBox>
        </InputBox>
        <InputBox>
        <StyledLabel>장소</StyledLabel>
          <StyledInput style={{width: "30%"}} type="text" value={place} onChange={e => setPlace(e.target.value)} required />
        </InputBox>
        <InputBox style={{alignItems: "flex-start"}}>
          <StyledLabel>게시글 내용</StyledLabel>
          <StyledTextareaAutosize minRows={3} value={postContent} onChange={e => setPostContent(e.target.value)} />
        </InputBox>
        <PostButton onClick={handlePostSubmit}>등록하기</PostButton>
      </PostAddBox>
    </>
  )
}

export default PlayEdit;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  height: 200px;
  margin: 50px -35px 0px -35px;
  padding: 30px 0 0 50px;
`

const PostAddBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
  height: 100%;
  margin: 50px 0 0 0;
  padding: 20px 50px 20px 50px;
`


const InputBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  width: 80%;
`

const StyledLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
  width: 13%;
`

const StyledInput = styled.input`
  background-color: #AAC4FF;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50%;
`;


const StyledSelect = styled.select`
  background-color: #AAC4FF;
  padding: 10px;
  margin: 0 10px 0 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 30%;
`;

const GenderSelectBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 0;
  width: 50%;
`

const StyledTextareaAutosize = styled(TextareaAutosize)`
  background-color: #AAC4FF;
  padding: 10px;
  margin-left: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const PostButton = styled.button`
  font-size: 2.00rem;
  padding: 10px 20px;
  background-color: #AAC4FF;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 50px 0 50px 0;
  width: 20%;
  height: 100px;
`
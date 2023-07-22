import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import * as Api from '../../api';

import styled from 'styled-components';

import Modal from '../../components/modal/Modal';

function PlayDetail() {
  const location = useLocation();
  const postId = location.pathname.match(/\/playdetail\/(\d+)/)[1];
  const userId = Number(localStorage.getItem('userId'));

  const isWriter = false;

  

  const [title, setTitle] = useState('범계에서 저녁7시에 술 먹어요!');
  const [place, setPlace] = useState('범계 용용선생');
  const [meetingTime, setMeetingTime] = useState('8월1일 19시');
  const [imageUrl, setImageUrl] = useState('http://placekitten.com/200/200');
  const [content, setContent] = useState('재밌게 놀사람 오세요~');
  const [post, setPost] = useState();


  const fetchGetDetail = async () => {
    try{
      const res = await Api.get(`/posts/${postId}`);
      const post = res.data.post;
      setPost(post);
    } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }

  }




  useEffect(() => {
    fetchGetDetail();
  }, []);

  return(

    <>
      <TopBox>
        <p>같이 놀자</p>
        <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        {isWriter ?
        <TopBoxButton >신청인원 보기</TopBoxButton>
        :
        <TopBoxButton >신청하기</TopBoxButton>
        }
      </TopBox>
      <PostDetailBox>
        <InputBox>

          <RecruitAbleBox>모집중</RecruitAbleBox>

        </InputBox>
        <InputBox>
          <p style={{fontSize: "2vw", fontWeight: "bold"}}>{post.post_title}</p>
        </InputBox>
        <InputBox style={{flexDirection: "column", alignItems: "start"}}>
          <p style={{margin: "0px 0px"}}>장소: {post.place}</p>
          <p style={{margin: "10px 0px"}}>만남시간: {post.meeting_time}</p>
        </InputBox>
        <InputBox>
        <img src={post.post_image} alt="postImage" style={{width: "50%", height: "25vw", marginTop: "10px", marginRight: "10px"}}/>
        </InputBox>
        <InputBox>
          <p>{post.post_content}</p>
        </InputBox>

        <CommentBox>
          <p>댓글</p>
          <CommentDetailBox>
            <img src={'http://placekitten.com/200/200'} alt="유저 프로필" style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: '#F9FAFB', marginRight: '20px' }} />
            <CommentContentBox>
              <p style={{margin: "0px 0px"}}>억만추</p>
              <p>수락되신 분들은 오픈채팅방으로 들어와주세요</p>
            </CommentContentBox>
          </CommentDetailBox>
        </CommentBox>
      </PostDetailBox>
    </>
  )
}

export default PlayDetail;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  height: 200px;
  margin: 50px -35px 0px -35px;
  padding-left: 50px;
`

const TopBoxButton = styled.button`
  background-color: #d2daff;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
`

const PostDetailBox = styled.div`
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

const RecruitAbleBox = styled.div`
  background-color: #AAC4FF;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 20px 0px 20px 0px;
`

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`

const CommentDetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid black;
`

const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
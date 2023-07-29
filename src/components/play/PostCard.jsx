import styled from 'styled-components';
import dayjs from 'dayjs';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

import { timeAgo } from '../../util/TimeAgo';
import { isWriter } from '../../util/isWriter';

import GenderInfo from './GenderInfo';

const MAX_CONTENT_LENGTH = 200;

function PostCard({post})  {
  const navigate = useNavigate();

  // const [category, setCategory] = useState('술');
  // const [title, setTitle] = useState('범계에서 오늘 저녁 술먹어요');
  // const [people, setPeople] = useState(8);
  // const [male, setMale] = useState('4');
  // const [female, setFmale] = useState('4');
  // const [totalM, setTotalM] = useState('8');
  // const [totalF, setTotalF] = useState('8');
  // const [place, setPlace] = useState('범계 용용선생');
  // const [meetingTime, setMeetingTime] = useState('2시간');
  // const [postImage, setPostImage] = useState('http://placekitten.com/200/200');
  // const [userImage, setUserImage] = useState('http://placekitten.com/200/200');
  // const [content, setContent] = useState('재밌게 놀사람 오세요~ ');
  // const [nickname, setNickname] = useState('억만추');

  

  return (
    <Card onClick = {() => navigate(`/playdetail/${post.postId}`)}>
      <ImageBox>
        <Image src={post.ProfileImage} alt="postImage" />
      </ImageBox>
      <ContentBox>
        <Category>{post.type}</Category>
        <Title>{post.title}</Title>
        <DetailBox>
          <DetailItem>남자</DetailItem>
          <GenderInfo total={post.totalM} filled={post.recruitedM} color='blue' />
          <DetailItem>여자</DetailItem>
          <GenderInfo total={post.totalF} filled={post.recruitedF} color='red' />
          <DetailItem>장소: {post.place}</DetailItem>
          <DetailItem>{timeAgo(dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'))}</DetailItem>
        </DetailBox>
        <ProfileBox>
          <ProfileImage src={post.User.UserFiles.File} alt="유저 프로필" />
          <Nickname>{post.User.nickname}</Nickname>
        </ProfileBox>
      </ContentBox>
      <PostContent>
          {post.content.length > MAX_CONTENT_LENGTH ? `${content.substring(0, MAX_CONTENT_LENGTH)}...` : post.content}
      </PostContent>
    </Card>
  );
};

export default PostCard;

const Card = styled.div`
  display: flex;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
  width: 90vw;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ImageBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  border-right: 1px solid #d3d3d3;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;
`;

const ContentBox = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const PostContent = styled.p`
  flex: 1;
  color: #333;
  margin-bottom: 10px;
  white-space: pre-wrap;  // 개행이 반영되도록 설정
`;

const Category = styled.h2`
  color: #0070f3;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const DetailBox = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-bottom: 20px;
`;

const DetailItem = styled.p`
  margin-bottom: 5px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Nickname = styled.span`
  color: #333;
  font-weight: bold;
`;




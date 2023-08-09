import styled from 'styled-components';
import dayjs from 'dayjs';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

import { timeAgo } from '../../util/TimeAgo';
import { isWriter } from '../../util/isWriter';

import { getImageSrc } from '../../util/imageCheck';

import GenderInfo from './GenderInfo';



const MAX_TITLE_LENGTH = 10;

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
      <ContentBox>
        <ProfileBox>
          <ProfileImage src={getImageSrc(post.User.UserFiles?.[0]?.File?.url)} alt="유저 프로필" />
          <Nickname>{post.User.nickname}</Nickname>
        </ProfileBox>
        <ImageBox>
          <Image src={getImageSrc(post.PostFiles?.[0]?.File?.url)} alt="postImage" />
        </ImageBox>
        <Category>{post.type}</Category>
        <Title>
          {post.title.length > MAX_TITLE_LENGTH ? `${post.title.substring(0, MAX_TITLE_LENGTH)}...` : post.title}
          <RecruitmentStatusBox isCompleted={post.isCompleted}>
            {post.isCompleted ? "모집완료" : "모집중"}
          </RecruitmentStatusBox>
        </Title>
        <DetailBox>
          {/* <DetailItem></DetailItem> */}
          <GenderInfo total={post.totalM} filled={post.recruitedM} color='#819FF7' gender='🙆🏻‍♂️'/>
          {/* <DetailItem>여자</DetailItem> */}
          <GenderInfo total={post.totalF} filled={post.recruitedF} color='#F78181' gender='🙆🏻‍♀️'/>
          <InfoContainer>
            <DetailItem>장소: {post.place}</DetailItem>
            <DetailItem>{timeAgo(dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'))}</DetailItem>
          </InfoContainer>
        </DetailBox>
      </ContentBox>

    </Card>
  );
};

export default PostCard;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 3px solid #d3d3d3;
  margin: 20px 0 20px 0;
  padding: 20px;
  font-family: 'Pretendard-Regular';  
  width: 80%;

  // transition: transform 0.2s ease-in-out;
  // height: 60vh;
  
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    display: block;
    width: 70%; /* Set width to 50% for two cards in one row on larger screens */
  }
`;

const ImageBox = styled.div`
  // width: 25vw;
  height: 30vh;
  border-radius: 10px; 
  display: flex;
  justify-content: center;
  margin: 20px 0px;

  @media (max-width: 1100px) {
    height: 20vh;
    border-right: 0px
  }
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  flex: 1;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // background-color: red;
  // padding-left: 20px;
`;

// const PostContent = styled.p`
//   margin-left: 10px;
//   font-size: 12px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   // flex: 1;
//   // color: #333;
//   // margin-bottom: 10px;
//   // white-space: pre-wrap;  // 개행이 반영되도록 설정
// `;

const Category = styled.h2`
  background-color: #F7CBD0;
  border-radius: 30px;
  font-size: 0.8rem;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 25px;
  display: inline-block;
  padding: 3px 7px 3px 7px;
`;

const Title = styled.p`
  font-weight: bold;
  margin-left: 10px;
  display: inline-block;
  // width: 18vw;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
`;

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 0.9em;
  color: #555;
  margin: 10px 0 20px 30px;
`;

const DetailItem = styled.p`
  font-weight: bold;
  font-size: 1.04rem;
  margin: 10px 20px 5px 0;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 20px;
  background-color: #F7E2EA;
  opacity: 80%;
  border-radius: 40px;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 3px;
`;

const InfoContainer = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`


const RecruitmentStatusBox = styled.div`
  background-color: ${props => props.isCompleted ? "#F08080" : "#32CD32"};
  border-radius: 8px;
  font-size: 0.8rem;
  margin-left: 8px;
  padding: 3px 7px;
  display: inline-block;
  color: white;
`;
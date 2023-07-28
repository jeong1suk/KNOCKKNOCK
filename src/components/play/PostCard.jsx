import styled from 'styled-components';
import dayjs from 'dayjs';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

import { timeAgo } from '../../util/TimeAgo';
import { isWriter } from '../../util/isWriter';

const MAX_CONTENT_LENGTH = 200;

function PostCard({post})  {
  const navigate = useNavigate();

  // const userId = Number(localStorage.getItem("userId"));


  // const handlePostDelete = async (e) => {
  //   e.stopPropagation();
  
  //   // Confirm dialog
  //   if (window.confirm("정말로 삭제하시겠습니까?")) {
  //     try {
  //       await Api.del(`/posts/${post.post_id}`);
  //       window.location.replace('/play');
  //     } catch (err) {
  //       if (err.response && err.response.data && err.response.data.message) {
  //           alert(err.response.data.message);
  //       } else {
  //           alert('라우팅 경로가 잘못되었습니다.');
  //       }
  //     }
  //   }
  // }
  
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

//   return(
//     <PostBox onClick = {() => navigate(`/playdetail/${post.post_id}`)}>
//       <SubDiv>
//         <p>카테고리 : {post.post_type}</p>
//         <p>남은남자 자리 : {post.recruited_m}</p>
//         <p>남은여자 자리 : {post.recruited_f}</p>
//         <p>{timeAgo(dayjs(post.createdAt).format('YYYY-MM-DD HH:mm'))}</p>
//       </SubDiv>
//       <SubDiv style={{alignItems: "flex-start"}}>
//         <p>제목 : {post.post_title}</p>
//         <p>장소 : {post.place}</p>
//         <p>{post.post_content}</p>
//         <ProfileDiv>
//           <img src={post.profile_image} alt="유저 프로필" style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', backgroundColor: '#F9FAFB', marginRight: '20px' }} />
//           <span>{post.User.nickname}</span>
//         </ProfileDiv>
//       </SubDiv>
//       <SubDiv style={{justifyContent: 'center'}}>
//         <img src={post.post_image} alt="postImage" style={{width: "150px", height: "150px", marginTop: "10px", marginRight: "10px"}}/>
//       </SubDiv>
//       {isWriter({userId, post}) && 
//       <DeleteButton onClick={handlePostDelete}>삭제</DeleteButton>
//       }
//     </PostBox>
//   );
// };



  const GenderInfo = ({ total, filled, color }) => {
    let people = [];
  
    for (let i = 0; i < total; i++) {
      people.push(<Person key={i} filled={i < filled} color={color} />);
    }
  
    return <TotalPeople>{people}</TotalPeople>;
  };
  

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

const TotalPeople = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Person = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${props => props.filled ? props.color : '#ccc'};
  margin-right: 2px;
`;


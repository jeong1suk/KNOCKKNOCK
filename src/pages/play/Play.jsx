import styled from 'styled-components';

import { useAsyncValue, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as Api from '../../api';

import PostCard from '../../components/play/PostCard';
import Pagination from '../../components/commons/Pagenation';

function Play()  {
  const navigate = useNavigate();
  
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPostCount, setAllPostCount] = useState(0);
  const [postType, setPostType] = useState('');

  const perPage = 5;
  const lastPage = Math.ceil(allPostCount / perPage);

  const fetchPosts = async () => {
    const res = await Api.get(`/posts?page=${currentPage}&perPage=${perPage}&type=${postType}`);
    setPostList(res.data.postList);
    setAllPostCount(res.data.allPostCount);
  };



  useEffect(() => {
    setCurrentPage(1); 
    fetchPosts();
  }, [postType]);
  
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  


  return(
    <>
      <TopBox>
        <TopPtagBox>
          <p>같이 놀자</p>
          <br></br>
          <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        </TopPtagBox>
        <TopButtonBox>
          <PostButton style={{marginRight: "10px"}} onClick={() => navigate(`/playadd`)}>게시글 만들기</PostButton>
        </TopButtonBox>
        
      </TopBox>
      <CategoryButtonBox>
        <CategoryButton onClick={() => setPostType('')}>전체</CategoryButton>
        <CategoryButton onClick={() => setPostType('술')}>술</CategoryButton>
        <CategoryButton onClick={() => setPostType('영화')}>영화</CategoryButton>
        <CategoryButton onClick={() => setPostType('식사')}>식사</CategoryButton>
        <CategoryButton onClick={() => setPostType('카페')}>카페</CategoryButton>
        <CategoryButton onClick={() => setPostType('산책')}>산책</CategoryButton>
        <CategoryButton onClick={() => setPostType('드라이브')}>드라이브</CategoryButton>
        <CategoryButton onClick={() => setPostType('공연관람')}>공연관람</CategoryButton>
        <CategoryButton onClick={() => setPostType('기타')}>기타</CategoryButton>
      </CategoryButtonBox>
      <PostCardBox>
        {postList.map(post => (
          <PostCard key={post.posId} post={post} />
        ))}
      </PostCardBox>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
    </>
  )
};

export default Play;


const TopBox = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
  margin: 50px 0px 50px 0px;
  gap: 40%;
  
  p {
    font-size: 2rem; 
    color: #1d1d1f; 
    font-weight: 600;
    line-height: 1.2;
  }

  p:last-of-type {
    font-size: 1rem; 
    color: #1d1d1f; 
    font-weight: 500;
    line-height: 1.2;
  }
  @media (min-width: 1024px) {
    padding: 50px 0 0 0;

    p {
      font-size: 3rem; 
    }

    p:last-child {
      font-size: 2rem; 
    }
  }

  @media (min-width: 390px) {    
    p {
      font-size: 2rem;
      margin-bottom: -0.3px;
    }

    p:last-of-type {
      font-size: 0.8rem;
    }
`

const PostButton = styled.button`
  font-size: 100%;
  padding: 10px 20px;
  background-color: #AAC4FF;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px 0 20px 20px; 
  width: 80%;
  height: 100px;
  transition: 0.3s;
  text-overflow: ellipsis;

  &:hover {
    background-color: #809FFF; 
    color: white;
    transform: scale(1.02);
  }
  @media (max-width: 1200px) {
    width: 100%;
    white-space: normal; /* Allow the text to wrap */
    max-width: 1000px;
    font-size:0.5rem;
  }
  @media (max-width: 390px) {
    width: 90%; 
    font-size: 0.4rem; /* Adjust the font size for smaller screens */
    height: 80px; /* Reduce the height for smaller screens */
    padding: 10px 15px; /* Adjust the padding for smaller screens */
    margin: 20px 0 20px 0; /* Adjust the margin for smaller screens */
  }
`
const CategoryButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px -35px 50px -35px;
  background-color: #FFFFFF;
  padding: 20px 0;
  border-top: 1px solid #d2d2d2;
  border-bottom: 1px solid #d2d2d2;
  @media (min-width: 1024px) {
    justify-content: space-evenly;
  }
  @media (min-width: 390px) {
    margin: 0px;
  }
`

const CategoryButton = styled.div`
  font-size: 1.2rem;
  color: #1d1d1f;
  // padding: 10px 20px;
  // border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  
  &:hover {
    transform: scale(1.2);
    color: #809FFF;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 516px) {
    font-size: 0.8rem;
    max-width: 100px; /* Set the maximum width for the button */
    white-space: normal; /* Allow the text to wrap */
  }
`

const PostBox = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  margin: 30px 50px 30px 50px;
`

const TopButtonBox = styled.div`
  display: flex;
  width: 20%;

  @media (max-width: 516px) {
    width: 40%;
  }
`
const PostCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopPtagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
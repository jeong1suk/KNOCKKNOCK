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
      <PostButtonBox>
        <p>같이 놀자</p>
        <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        <TopButtonBox>
          <PostButton style={{marginRight: "10px"}} onClick={() => navigate(`/playadd`)}>게시글 만들기</PostButton>
          <PostButton>내가 쓴 게시글 보기</PostButton>
        </TopButtonBox>
        
      </PostButtonBox>
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
          <PostCard key={post.post_id} post={post} />
        ))}
      </PostCardBox>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
    </>
  )
};

export default Play;

const PostButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  height: 10%;
  margin: 50px 0px 50px 0px;
  padding-left: 50px;
  
  p {
    font-size: 2rem; 
    color: #1d1d1f; 
    font-weight: 600;
    line-height: 1.2;
  }

  p:last-child {
    font-size: 1.5rem; 
    color: #1d1d1f; 
    font-weight: 500;
    line-height: 1.2;
  }
  @media (min-width: 1024px) {
    padding: 50px 0 0 80px;

    p {
      font-size: 3rem; 
    }

    p:last-child {
      font-size: 2rem; 
    }
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
  margin: 20px 0 20px 0; // Changed margin from the reference PostButton style
  width: 80%;
  height: 100px;
  transition: 0.3s;

  &:hover {
    background-color: #809FFF; 
    color: white;
    transform: scale(1.02);
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
`

const CategoryButton = styled.div`
  font-size: 1.2rem;
  color: #1d1d1f;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  
  &:hover {
    transform: scale(1.3);
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
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
  width: 30%;
`

const PostCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as Api from '../../api';

import PostCard from '../../components/play/PostCard';
import Pagination from '../../components/play/Pagenation';

function Play()  {
  const navigate = useNavigate();
  
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPostCount, setAllPostCount] = useState(0);
  const [postType, setPostType] = useState('');

  const perPage = 5;

  const fetchPosts = async () => {
    const res = await Api.get(`/posts?page=${currentPage}&perPage=${perPage}&type=${postType}`);
    setPostList(res.data.postList);
    setAllPostCount(res.data.allPostCount);
  };


  useEffect(() => {
    fetchPosts();
  }, [currentPage, postType]);

  const lastPage = Math.ceil(allPostCount / perPage);


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
      {postList.map(post => (
        <PostCard key={post.post_id} post={post} />
      ))}
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
  height: 200px;
  margin: 50px -35px 0px -35px;
  padding-left: 50px;
`

const PostButton = styled.button`
  background-color: #d2daff;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;

`

const CategoryButtonBox = styled.div`
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  margin: 0px -35px 0px -35px;

`

const CategoryButton = styled.div`
  font-size: 2.25rem;
  margin: 10px 30px 10px 30px;
  cursor: pointer;
`

const PostBox = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  margin: 30px 50px 30px 50px;
`

const TopButtonBox = styled.div`
  display: flex;
  
`


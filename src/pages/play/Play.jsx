import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import PostCard from '../../components/play/PostCard';


function Play()  {
  const navigate = useNavigate();


  return(
    <>
      <PostButtonBox>
        <p>같이 놀자</p>
        <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        <PostButton onClick={() => navigate(`/playadd`)}>게시글 만들기</PostButton>
      </PostButtonBox>
      <CategoryButtonBox>
        <CategoryButton>술</CategoryButton>
        <CategoryButton>영화</CategoryButton>
        <CategoryButton>식사</CategoryButton>
        <CategoryButton>카페</CategoryButton>
        <CategoryButton>산택</CategoryButton>
        <CategoryButton>드라이브</CategoryButton>
        <CategoryButton>공연관람</CategoryButton>
        <CategoryButton>기타</CategoryButton>
      </CategoryButtonBox>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
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



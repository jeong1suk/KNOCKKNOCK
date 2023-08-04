import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import { Link } from "react-router-dom";
import { getImageSrc } from "../../util/imageCheck";

const UserPostAndParticipants = () => {
  const [posts, setPosts] = useState([]);
  const [joins, setJoins] = useState([]);

  const fetchData = async () => {
    try {
      const resPosts = await Api.get("/users/mypage/posts");
      const resJoin = await Api.get("/users/mypage/participants");
      console.log(resPosts.data.posts);
      // console.log(resJoin.data);
      setPosts(resPosts.data.posts);
      setJoins(resJoin.data.participants);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  getImageSrc;
  return (
    <Userbox>
      <div>내가 쓴 Post</div>
      <Postbox>
        {posts.map((post) => (
          <Content>
            <Link to={`/playdetail/${post.postId}`}>
              <p>{post.title}</p>
              <img src={getImageSrc(post.PostFiles[0]?.File.url)} ></img>
            </Link>
          </Content>
        ))}
      </Postbox>

      <div>참가한 Participants</div>
      <Postbox>
        {joins.map((join)=>(
          <Content>
            <Link to={`/playdetail/${join.Post.postId}`}>
                <p>{join.Post.title}</p>
              <img src={getImageSrc(join.Post.PostFiles[0]?.File.url)} ></img>
              <p>{join.status}</p>
            </Link>
          </Content>
        ))}
      </Postbox>
    </Userbox>
  );
};

const Userbox = styled.div`
  display: flex;
  height: 80vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #f5f5f7;
  padding: 2rem;
  overflow: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Postbox = styled.div`
  width: 100%;
  height: 50%;
  border-top: 1px solid #dfdfdf;
  overflow-x: auto; // 가로 스크롤을 활성화
  display: flex; // 요소들을 가로로 쌓기 위해 flex 사용
  align-items: flex-start; // 가로 정렬을 위해 flex-start 사용

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.0rem;
  }
`;

const Content = styled.div`
  flex: 0 0 auto;
  border: 4px double #FFCCCC;
  border-radius: 10px;
  margin: 20px 20px 0 0;
  width: 10rem;
  height: 70%;
  padding: 0 0 10px 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
  }
  
  img {
    width:5rem; 
    justify-content:flex-end;
  }
`

export default UserPostAndParticipants;

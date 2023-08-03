import { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import { Link } from "react-router-dom";
const UserPostAndParticipants = () => {
  const [posts, setPosts] = useState([]);
  const [join, setJoin] = useState([]);

  const fetchData = async () => {
    try {
      const res = await Api.get("/users/mypage/posts");
      console.log(res.data.posts);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Userbox>
      <Postbox>
        <div>내가 쓴 Post</div>
        {posts.map((post) => (
          <div style={{ border: "1px solid #000" }}>
            <Link to={`/playdetail/${post.postId}`}>
              <div>내용:{post.content}</div>
              <div>장소:{post.place}</div>
              <div>제목:{post.title}</div>
              <div>type:{post.type}</div>
            </Link>
          </div>
        ))}
      </Postbox>

      <Postbox>참가한 Participants</Postbox>
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
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
const Postbox = styled.div`
  width: 90%;
  height: 50%;
  border: 1px solid #000;
`;

export default UserPostAndParticipants;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';

import * as Api from "../../api";

import styled from 'styled-components';
import { isWriter } from '../../util/isWriter';

import Modal from "../../components/modal/Modal";

const limit = 5;

function PlayDetail() {
  const location = useLocation();
  const postId = location.pathname.match(/\/playdetail\/(\d+)/)[1];
  const userId = Number(localStorage.getItem("userId"));

  const [post, setPost] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [participationFlag, setParticipationFlag] = useState();
  const [comment, setComment] = useState("");

  const [isParticipantModalOpen, setIstParticipantModalOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);

  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  console.log(nextCursor);
  useEffect(() => {
    if(isParticipantModalOpen){
      fetchParticipantsList();
    }
  }, [isParticipantModalOpen]);

  const fetchParticipantsList = async () => {
    try {
      const res = await Api.get(`/participants/${postId}/userlist?limit=${limit}`);

      setParticipantsList(res.data.participantsList.filter(participant => participant.status === "pending"));
    } catch (err) {
      alert('참여자 정보를 불러오는 데 실패했습니다.');
    }
  }

  const handleAccept = async (participantId) => {
    try {
      const res = await Api.put(`/participants/${participantId}/allow`);
      fetchParticipantsList(); 
    } catch (err) {
      alert('수락 처리에 실패했습니다.');
    }
  }

  const handleReject = async (participantId) => {
    try {
      await Api.put(`/participants/${participantId}/deny`);
      fetchParticipantsList();  
    } catch (err) {
      alert('거절 처리에 실패했습니다.');
    }
  }

  const fetchGetDetail = async () => {
    try {
      const res = await Api.get(`/posts/${postId}`);
      const postData = res.data.post;
      setPost(postData);
    } catch (err) {
      if (err.response.data.message) {
          alert(err.response.data.message);
      } else {
          alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }

  const fetchApply = async () => {
    try {
      const res = await Api.post(`/participants/${postId}`);

    } catch (err) {
      if (err.response.data.message) {
          alert(err.response.data.message);
      } else {
          alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }

  useEffect(() => {
    const fetchGetComment = async () => {
      try {
        if (nextCursor === -1) {
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
  
        const res = await Api.get(`/comments/?postId=${postId}&cursor=${nextCursor}`);
  
        const commentData = res.data;
  
        if (commentData.commentList?.length < 10) {
          setNextCursor(-1);
        } else {
          setNextCursor(commentData.commentList[commentData.commentList.length - 1].comment_id);
        }
  
        if (nextCursor === 0) {
          setComments(commentData.commentList);
        } else if (nextCursor > 0 && commentData.commentList.length > 0) {
          setComments(oldComments => [...oldComments, ...commentData.commentList]);
        }
  
        setIsReached(false);
      } catch (err) {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert('라우팅 경로가 잘못되었습니다.');
        } 
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
  
      if (scrollTop + clientHeight >= scrollHeight) {
          setIsReached(true);
      }
    };
  
    if (isReached && !isLoading) {
      fetchGetComment();
      setIsReached(false);
    }
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isReached, isLoading, nextCursor, postId]);
  

  const postComment = async () => {
    try {
      const body = {
        content: comment,
      };
      
      const res = await Api.post(`/comments/${postId}`, body);
        setComment("");  
        window.location.reload();

    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }




  const editComment = (commentId, commentContent) => {
    setIsEditing(commentId);
    setEditedContent(commentContent);
  }
  
  const saveComment = (commentId) => {
    editCommentRequest(commentId, editedContent);
    setIsEditing(null);
  }
  
  const deleteComment = (commentId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteCommentRequest(commentId);
    }
  }


  const editCommentRequest = async (commentId, commentContent) => {
    try {
      const body = {
        content: commentContent,
      };
      
      const res = await Api.put(`/comments/${postId}/${commentId}`, body);
      window.location.reload();
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('라우팅 경로가 잘못되었습니다.');
      }
    }
  }
  
  const deleteCommentRequest = async (commentId) => {
    try {
      const res = await Api.del(`/comments/${commentId}`);
      window.location.reload();
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

  return (
    <>
      <TopBox>
        <p>같이 놀자</p>
        <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
        {isWriter({userId, post}) ?
        <TopBoxButton onClick={() => setIstParticipantModalOpen(true)}>신청인원 보기</TopBoxButton>
        :
        <TopBoxButton onClick={fetchApply}>신청하기</TopBoxButton>
        }
        {isParticipantModalOpen && (
          <Modal onClose={() => setIstParticipantModalOpen(false)}>
            <ParticipantModalDiv>
              {participantsList.map((participant, index) => (
                <div key={index} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px", padding: "10px"}}>
                  <img src={participant.profile_image} alt="profile" style={{width: "30%", height: "100px", borderRadius: "50%"}}/>
                  <div style={{width: "30%", textAlign: "left"}}>
                    <p>Nickname: {participant.nickname}</p>
                    <p>Gender: {participant.gender}</p>
                    <p>Age: {participant.age}</p>
                    <p>Job: {participant.job}</p>
                  </div>
                  <div style={{width: "30%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <button style={{marginBottom: "10px"}} onClick={() => handleAccept(participant.participationId)}>수락</button>
                    <button onClick={() => handleReject(participant.participationId)}>거절</button>
                  </div>
                </div>
              ))}

            </ParticipantModalDiv>
          </Modal>
        )}
      </TopBox>
      <PostDetailBox>
        <InputBox>
          <RecruitAbleBox>모집중</RecruitAbleBox>
        </InputBox>
        <InputBox>
          <p style={{ fontSize: "2vw", fontWeight: "bold" }}>
            {post.post_title}
          </p>
        </InputBox>
        <InputBox style={{ flexDirection: "column", alignItems: "start" }}>
          <p style={{ margin: "0px 0px" }}>장소: {post.place}</p>
          <p style={{ margin: "10px 0px" }}>만남시간: {dayjs(post.meeting_time).format('YYYY-MM-DD HH:mm')}</p>
        </InputBox>
        <InputBox>
          <img
            src={post.post_image}
            alt="postImage"
            style={{
              width: "50%",
              height: "25vw",
              marginTop: "10px",
              marginRight: "10px",
            }}
          />
        </InputBox>
        <InputBox>
          <p>{post.post_content}</p>
        </InputBox>

        <CommentBox>
          <p>댓글</p>
          <CommentInputArea>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 작성해주세요."
            />
            <button onClick={postComment}>댓글 등록</button>
          </CommentInputArea>
          {comments.map((comment, index) => (
            <CommentDetailBox key={index}>
              <img
                src={"http://placekitten.com/200/200"}
                alt="유저 프로필"
                style={{
                  height: "2.5rem",
                  width: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "#F9FAFB",
                  marginRight: "20px",
                }}
              />
              <CommentContentBox>
                <p style={{ margin: "0px 0px" }}>{comment.nickname}</p>
                {comment.comment_id === isEditing ? (
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p>{comment.comment_content}</p>
                )}
                {comment.user_id === userId && (
                  <>
                    {comment.comment_id === isEditing ? (
                      <button onClick={() => saveComment(comment.comment_id)}>저장</button>
                    ) : (
                      <button onClick={() => editComment(comment.comment_id, comment.comment_content)}>수정</button>
                    )}
                    <button onClick={() => deleteComment(comment.comment_id)}>삭제</button>
                  </>
                )}
              </CommentContentBox>
            </CommentDetailBox>
          ))}
        </CommentBox>
      </PostDetailBox>
    </>
  );
}

export default PlayDetail;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ffffff;
  height: 200px;
  margin: 50px -35px 0px -35px;
  padding-left: 50px;
`;

const TopBoxButton = styled.button`
  background-color: #d2daff;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
`;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 100%;
  margin: 50px 0 0 0;
  padding: 20px 50px 20px 50px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  width: 80%;
`;

const RecruitAbleBox = styled.div`
  background-color: #aac4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 20px 0px 20px 0px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;

const CommentDetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid black;
`;

const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ParticipantModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CommentInputArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  textarea {
    width: 90%;
    padding: 10px;
    margin-right: 10px;
    resize: none; /* 사용자가 textarea 크기를 변경하지 못하게 함 */
  }

  button {
    width: 10%;
    background-color: #007BFF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
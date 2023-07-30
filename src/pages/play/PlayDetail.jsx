import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from 'dayjs';

import * as Api from "../../api";

import styled from 'styled-components';
import { isWriter } from '../../util/isWriter';

import DropdownMenu from "../../components/modal/DropdownMenu";
import Modal from "../../components/modal/Modal";
import GenderInfo from "../../components/play/GenderInfo";
import ParticipantList from "../../components/play/ParticipantList";

const limit = 5;

function PlayDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.match(/\/playdetail\/(\d+)/)[1];
  const userId = Number(localStorage.getItem("userId"));

  const [post, setPost] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [participationFlag, setParticipationFlag] = useState();
  const [comment, setComment] = useState("");

  const [dropdownSelection, setDropdownSelection] = useState("신청인원");
  const [isParticipantModalOpen, setIstParticipantModalOpen] = useState(false);

  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);

  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if(isParticipantModalOpen){
      fetchParticipantsList();
    }
  }, [isParticipantModalOpen, dropdownSelection]);

const fetchParticipantsList = async () => {
  try {
    const status = dropdownSelection === "신청인원" ? "pending" : "accepted";
    if(status == "pending") {
      const res = await Api.get(`/participants/${postId}/userlist?limit=${limit}`);
    }
    setParticipantsList(res.data.participantsList.filter(participant => participant.status === status));
  } catch (err) {
    alert('참여자 정보를 불러오는 데 실패했습니다.');
  }
}

  const handleAccept = async (participantId) => {
    console.log(participantId);
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



  const handlePostDelet = async (postId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deletePostRequest(postId);
    }
  }


  const deletePostRequest = async (postId) => {
    try {
      await Api.del(`/posts/${postId}`);
      navigate(`/play`);
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
          setNextCursor(commentData.commentList[commentData.commentList.length - 1].commentId);
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
        <TopInnerBox>
          <p>같이 놀자</p>
          <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
          {isWriter({userId, post}) ?
          <TopBoxButton onClick={() => setIstParticipantModalOpen(true)}>신청인원 보기</TopBoxButton>
          :
          <TopBoxButton onClick={fetchApply}>신청하기</TopBoxButton>
          }
          {isParticipantModalOpen && (
            <Modal onClose={() => setIstParticipantModalOpen(false)}>
              <DropdownMenu 
                options={[
                  { label: "신청인원", value: "신청인원" },
                  { label: "모집된 인원", value: "모집된 인원" },
                ]}
                selectedOption={dropdownSelection}
                handleOptionChange={(e) => setDropdownSelection(e.target.value)}
              />
              <ParticipantList
                participantsList={participantsList}
                handleAccept={handleAccept}
                handleReject={handleReject}
                selectedOption ={dropdownSelection}
              />
            </Modal>
          )}
        </TopInnerBox>
      </TopBox>
      <PostDetailBox>
        <PostDetailFirstBox>
          <EditDeleteButtonBox>
          {isWriter({userId, post}) &&
            <>
              <TopBoxButton onClick={() => navigate(`/playedit/${postId}`)}>수정하기</TopBoxButton>
              <TopBoxButton onClick={handlePostDelet}>삭제하기</TopBoxButton>
            </>
          }
          </EditDeleteButtonBox>   
          <InputBox>
            {post.IsCompleted ? 
              <RecruitAbleBox>모집완료</RecruitAbleBox>
              :
              <RecruitAbleBox>모집중</RecruitAbleBox>
            }
            <GenderInfoBox>
              <GenderInfo total={post.totalM} filled={post.recruitedM} color='blue' />
              <GenderInfo total={post.totalF} filled={post.recruitedF} color='red' />
            </GenderInfoBox>

          </InputBox>
          <InputBox>
            <p style={{ fontSize: "2vw", fontWeight: "bold" }}>
              {post.title}
            </p>
            
          </InputBox>
          <InputBox style={{ flexDirection: "column", alignItems: "start" }}>
            <p style={{ margin: "0px 0px" }}>장소: {post.place}</p>
            <p style={{ margin: "10px 0px" }}>만남시간: {dayjs(post.meetingTime).format('YYYY-MM-DD HH:mm')}</p>
          </InputBox>
          <InputBox>
            <img
              src={post.postImage}
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
            <p>{post.content}</p>
          </InputBox>
        </PostDetailFirstBox>
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
                {comment.commentId === isEditing ? (
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                ) : (
                  <p>{comment.commentContent}</p>
                )}
                {comment.userId === userId && (
                  <>
                    {comment.commentId === isEditing ? (
                      <button onClick={() => saveComment(comment.commenId)}>저장</button>
                    ) : (
                      <button onClick={() => editComment(comment.commentId, comment.commentContent)}>수정</button>
                    )}
                    <button onClick={() => deleteComment(comment.commentId)}>삭제</button>
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
  align-items: center;
  background-color: #F8F8F8;
  height: 200px;
  margin: 100px 0px 0px 0px;
`;

const TopInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  
`


const TopBoxButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
  width: 15%;
`;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8; 
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
  font-family: 'San Francisco', Arial, sans-serif; 
`;

const RecruitAbleBox = styled.div`
  background-color: #007BFF; // Same as the button above
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  padding: 20px 0px 20px 0px;
  color: white; // To contrast with the background
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
  border-bottom: 1px solid #cccccc; // Light gray border
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
`;

const CommentInputArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  textarea {
    width: 90%;
    padding: 10px;
    margin-right: 10px;
    resize: none; // 사용자가 textarea 크기를 변경하지 못하게 함
    border: 1px solid #cccccc; // Light gray border
  }

  button {
    width: 10%;
    background-color: #007BFF; // Same as the button above
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

const GenderInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  gap: 10px;
`

const PostDetailFirstBox = styled.div`
  background: #ffffff;
  border-radius: 10px; 
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px; 
  width: 80%; 
`

const EditDeleteButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  gap: 10px;
  font-family: 'San Francisco', Arial, sans-serif; 
`
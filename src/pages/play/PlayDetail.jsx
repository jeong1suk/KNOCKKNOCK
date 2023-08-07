import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaEllipsisV, FaEdit, FaTrashAlt } from 'react-icons/fa';

import dayjs from "dayjs";

import * as Api from "../../api";

import styled from "styled-components";
import { isWriter } from "../../util/isWriter";
import { getImageSrc } from "../../util/imageCheck";
import { formatDate } from "../../util/formatDate";
import { timeAgo } from "../../util/TimeAgo";

import DropdownMenu from "../../components/modal/DropdownMenu";
import Modal from "../../components/modal/Modal";
import GenderInfo from "../../components/play/GenderInfo";
import ParticipantList from "../../components/play/ParticipantList";

import { UserStateContext } from "../../context/user/UserProvider";

const limit = 5;

function PlayDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useContext(UserStateContext);

  const postId = location.pathname.match(/\/playdetail\/(\d+)/)[1];
  const userId = Number(localStorage.getItem("userId"));

  const [post, setPost] = useState([]);
  const [postMenuOpen, setPostMenuOpen] = useState(null);

  const [participantsList, setParticipantsList] = useState([]);
  const [participationFlag, setParticipationFlag] = useState();

  const [canceled, setCanceled] = useState();
  const [status, setStatus] = useState();

  const [dropdownSelection, setDropdownSelection] = useState("신청인원");
  const [genderSelection, setGenderSelection] = useState("전체");

  const [isParticipantModalOpen, setIstParticipantModalOpen] = useState(false);
  const [modalCursor, setModalCursor] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentProfileImage, setCommentProfileImage] = useState();
  const [comment, setComment] = useState("");
  const [isAccepter, setIsAccepter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);


  const [nextCursor, setNextCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);

  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    if (isParticipantModalOpen) {
      fetchParticipantsList();
    }
  }, [isParticipantModalOpen, dropdownSelection, genderSelection]);

  const fetchParticipantsList = async () => {
    try {
      const status = dropdownSelection === "신청인원" ? "pending" : "accepted";
      let res;
      if(status == "pending") {
        if(genderSelection == "전체"){
            res = await Api.get(`/participants/${postId}/userlist`);
        }
        else{
            res = await Api.get(`/participants/${postId}/userlist?gender=${genderSelection}`);
        }
        setParticipantsList(res.data.participantsList);
        
      }
      else if(status == "accepted") {
        res = await Api.get(`/participants/${postId}/acceptedlist`);
        setParticipantsList(res.data.acceptedUsers);

      }
    } catch (err) {
      alert("참여자 정보를 불러오는 데 실패했습니다.");
    }
  };



  const handleAccept = async (participantId) => {
    try {
      const res = await Api.put(`/participants/${participantId}/allow`);
      fetchParticipantsList();
    } catch (err) {
      alert("수락 처리에 실패했습니다.");
    }
  };

  const handleReject = async (participantId) => {
    try {
      await Api.put(`/participants/${participantId}/deny`);
      fetchParticipantsList();
    } catch (err) {
      alert("거절 처리에 실패했습니다.");
    }
  };

  const fetchGetDetail = async () => {
    try {
      const res = await Api.get(`/posts/${postId}`);
      const postData = res.data.post;
      setPost(postData);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const handleApplyPost = async (postId) => {
    const confirmApplyPost = window.confirm("모임에 참가신청하시겠습니까?");
    if (confirmApplyPost) {
      applyPostRequest(postId);
      
    }
  };

  const handleApplyPut = async (postId) => {
    const confirmApplyPut = window.confirm(
      "정말로 참가신청을 취소하시겠습니까?"
    );
    if (confirmApplyPut) {
      applyPutRequest(postId);
      alert("취소되었습니다");
    }
  };

  const applyPostRequest = async (postId) => {
    try {
      const res = await Api.post(`/participants/${postId}`);
      alert("신청되었습니다");
      applyGetRequest();
      
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const applyPutRequest = async (postId) => {
    try {
      const res = await Api.put(`/participants/${postId}`);
      applyGetRequest();
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const applyGetRequest = async () => {
    try {
      const res = await Api.get(`/participants/${postId}`);
      const data = res.data;
      setCanceled(data.canceled);
      setStatus(data.status);
    } catch (err) {
      if (err.response.data.message) {
        // alert(err.response.data.message);
        setCanceled(true);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  }




  const handlePostDelete = async (postId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deletePostRequest(postId);
    }
  };

  const deletePostRequest = async (postId) => {
    try {
      await Api.del(`/posts/${postId}`);
      navigate(`/play`);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  }





  
const fetchGetComment = useCallback(
  async cursor => {
    try {
      if (cursor === -1) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);

        const res = await Api.get(
          `/comments/${postId}?cursor=${cursor}&limit=${limit}`
        );
        const commentData = res.data;
        setIsAccepter(true);

        if (commentData.commentList?.length < limit) {
          setNextCursor(-1);
        } else {
          setNextCursor(
            commentData.commentList[commentData.commentList.length - 1]
              .commentId
          );
        }

        let newComments;

        if (cursor === 0) {
          newComments = commentData.commentList;
        } else if (cursor > 0 && commentData.commentList.length > 0) {
          newComments = [...comments, ...commentData.commentList];
        } else if (commentData.commentList.length === 0) {
          newComments = [...comments];
        }

        setComments(newComments);
        setIsReached(false);
      } catch (err) {
        if (err.response.data.message) {
          // alert(err.response.data.message);
          setIsAccepter(false);
        } else {
          alert("라우팅 경로가 잘못되었습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isReached]
  );

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
        setIsReached(true);
    }
  }, []);

  useEffect(() => {
    // 페이지 초기 렌더링 시에 List를 불러오기 위해 호출
    fetchGetComment(nextCursor);
    // 스크롤 이벤트 핸들러 등록 및 해제
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchGetComment]);

  const postComment = async (postId) => {
    try {
      const body = {
        content: comment,
      };

      const res = await Api.post(`/comments/${postId}`, body);
      // 새로 작성된 댓글 정보를 직접 만들어서 기존 댓글 목록에 추가
      const newComment = {
        content: comment,
        userId: userId,
        commentId: res.data.commentId,
        User: {
          UserFiles: [
            {
              File: {
                url: userState.user?.url,
              },
            },
          ],
          nickname: userState.user.nickname,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const editComment = (commentId, content) => {
    setIsEditing(commentId);
    setEditedContent(content);
  };

  const saveComment = (commentId) => {
    editCommentRequest(commentId, editedContent);
    setIsEditing(null);
  };

  const deleteComment = (commentId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteCommentRequest(commentId);
    }
  };

  const editCommentRequest = async (commentId, editedContent) => {
    try {
      const body = {
        content: editedContent,
      };

      const res = await Api.put(`/comments/${postId}/${commentId}`, body);

      const newComment = {
        content: editedContent,
        userId: userId,
        commentId: commentId,
        User: {
          UserFiles: [
            {
              File: {
                url: userState.user?.url,
              },
            },
          ],
          nickname: userState.user.nickname,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments.slice(1)]);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  const deleteCommentRequest = async (commentId) => {
    try {
      const res = await Api.del(`/comments/${postId}/${commentId}`);
      setComments((prevComments) => [...prevComments.slice(1)]);
    } catch (err) {
      if (err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  useEffect(() => {
    fetchGetDetail();
    applyGetRequest();
  }, []);



  return (
    <>
      <TopBox>
        <TopInnerBox>
          <TopPtagBox>
            <p>같이 놀자</p>
            <p>다양한 단체 미팅 중 원하는 미팅에 참여해보세요</p>
          </TopPtagBox>
          
          {isWriter({ userId, post }) ? (
            <TopBoxButton onClick={() => setIstParticipantModalOpen(true)}>
              신청인원 보기
            </TopBoxButton>
          ) : status === "rejected" ? (
            <TopBoxButton
              onClick={() => alert("거절당한 참가자는 신청할 수 없습니다.")}
            >
              신청하기
            </TopBoxButton>
          ) : post.isCompleted == true ? (
            <TopBoxButton
              onClick={() => alert("이미 모집 완료된 게시글 입니다.")}
            >
              신청하기
            </TopBoxButton>
          ) : canceled ? (
            <TopBoxButton onClick={() => handleApplyPost(postId)}>
              신청하기
            </TopBoxButton>
          ) : (
            <TopBoxButton onClick={() => handleApplyPut(postId)}>
              취소하기
            </TopBoxButton>
          )}

        {isParticipantModalOpen && (
          <Modal onClose={() => setIstParticipantModalOpen(false)}>
            <DropdownMenuDiv>
              <DropdownMenu
                options={[
                  { label: "신청인원", value: "신청인원" },
                  { label: "모집된 인원", value: "모집된 인원" },
                ]}
                selectedOption={dropdownSelection}
                handleOptionChange={(e) => setDropdownSelection(e.target.value)}
              />

              {dropdownSelection === "신청인원" && (
                <DropdownMenu
                  options={[
                    { label: "전체", value: "전체" },
                    { label: "남", value: "남" },
                    { label: "여", value: "여" },
                  ]}
                  selectedOption={genderSelection}
                  handleOptionChange={(e) => setGenderSelection(e.target.value)}
                />
              )}
            </DropdownMenuDiv>
            <ParticipantList
              participantsList={participantsList}
              handleAccept={handleAccept}
              handleReject={handleReject}
              selectedOption={dropdownSelection}
            />
          </Modal>
        )}
        </TopInnerBox>
      </TopBox>
      <PostDetailBox>
        <PostDetailFirstBox>
          <EditDeleteButtonBox>
          <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setPostMenuOpen((prev) => (prev === postId ? null : postId));
          }}
        >
          <FaEllipsisV />
        </IconButton>
        {isWriter({ userId, post }) && postMenuOpen === postId && (
          <DropdownMenuDiv>
            <IconButton onClick={() => navigate(`/playedit/${postId}`)}>

              <FaEdit /> 수정하기
            </IconButton>
            <IconButton onClick={() => handlePostDelete(postId)}>
            <FaTrashAlt />삭제하기
            </IconButton>
          </DropdownMenuDiv>
        )}
          </EditDeleteButtonBox>
          <InputBox>
            {post.isCompleted ? (
              <RecruitAbleBox>모집완료</RecruitAbleBox>
            ) : (
              <RecruitAbleBox>모집중</RecruitAbleBox>
            )}
            <GenderInfoBox>
              <GenderInfo
                total={post.totalM}
                filled={post.recruitedM}
                color="blue"
              />
              <GenderInfo
                total={post.totalF}
                filled={post.recruitedF}
                color="red"
              />
            </GenderInfoBox>
          </InputBox>
          <InputBox>
            <p style={{ fontSize: "2vw", fontWeight: "bold" }}>{post.title}</p>
          </InputBox>
          <InputBox style={{ flexDirection: "column", alignItems: "start" }}>
            <p style={{ margin: "0px 0px" }}>장소: {post.place}</p>
            <p style={{ margin: "10px 0px" }}>
              만남시간: {formatDate(post.meetingTime)}
            </p>
          </InputBox>
          <InputBox>
            <img
              src={getImageSrc(post.PostFiles?.[0]?.File?.url)}
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
          {isAccepter ? 
          <>
            <p>댓글</p>
            <CommentInputArea>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 작성해주세요."
              />
              <button onClick={() => postComment(postId)}>댓글 등록</button>
            </CommentInputArea>
          </>
          :
          <p>수락된 참가자만 댓글확인 및 작성 할 수 있습니다.</p>
          }
          
          {comments.map((comment, commentId) => (
            <CommentDetailBox key={commentId}>
              <CommentImageBox>
                <img
                  src={getImageSrc(comment.User?.UserFiles?.[0]?.File?.url)}
                  alt="유저 프로필"
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#F9FAFB",
                    marginRight: "20px",
                  }}
                />
              </CommentImageBox>
              <CommentContentBox>
                <CommentNicknameBox>
                  <p style={{fontWeight: "bold"}}>{comment.User.nickname}</p>
                  <p style={{color: "#555"}}>{timeAgo(dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm'))}</p>
                </CommentNicknameBox>
                
                {comment.commentId === isEditing ? (
                  <CommentEditArea>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      style={{width: "100%", minHeight: "40px"}}
                    />
                    
                      <button onClick={() => setIsEditing(null)}>취소</button>
                      <button onClick={() => saveComment(comment.commentId)}>수정</button>
                    
                  </CommentEditArea>
                ) : (
                  <CommentEditDeleteBox>
                    <p>{comment.content}</p>
                    {comment.userId === userId && (
                      <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen((prev) => (prev === commentId ? null : commentId));
                          }}
                        >
                          <FaEllipsisV />
                        </IconButton>
                        {menuOpen === commentId && (
                          <MenuWrapper>
                            <IconButton
                              onClick={() => editComment(comment.commentId, comment.content)}
                            >
                              <FaEdit /> 수정
                            </IconButton>
                            <IconButton
                              onClick={() => deleteComment(comment.commentId)}
                            >
                              <FaTrashAlt /> 삭제
                            </IconButton>
                          </MenuWrapper>
                        )}
                      </div>
                    )}
                  </CommentEditDeleteBox>
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
const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #555;
  padding: 10px;
  &:hover {
    color: #333;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.4);
  z-index: 1;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  height: 200px;
  margin: 100px 0px 0px 0px;
`;

const TopInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20%;
  width: 75%;
`;

const TopPtagBox = styled.div`
  font-family: 'KIMM_Bold';
  font-size: 3rem; 
  color: #1d1d1f; 
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0px;

  p:last-of-type {
    font-size: 1.5rem; 
    color: #1d1d1f; 
    font-weight: 500;
    line-height: 1.2;
  }
`;

const TopBoxButton = styled.button`
  font-size: 100%;
  font-family: 'KIMM_Bold';
  padding: 10px 10px;
  background-color: #F7CBD0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  margin: 10px 0;
  width: 30%;
  height: 30%;
  transition: 0.3s;
  text-overflow: ellipsis;

  &:hover {
    border: 1px solid #3B0B0B;
    color: #3B0B0B;
    transform: scale(1.02);
  }
`;

const PostDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
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
  font-family: "San Francisco", Arial, sans-serif;
`;

const RecruitAbleBox = styled.div`
  font-family: 'KIMM_Bold';
  background-color: #F7CBD0; // Same as the button above
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

  @media (max-width: 600px) {    
    width: 100%;
`;

const CommentDetailBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 11px;
  background-color: red;
  width: 100%;
  border-bottom: 1px solid #cccccc; // Light gray border
`;

const CommentImageBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`

const CommentNicknameBox = styled.div`
  display: flex;
  justify-content: start;
  margin-right: 10px;

  p {
    margin: 5px 10px 0px 0px;
  }
`

const CommentContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

const CommentEditArea = styled.div`
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
  background-color: #007bff; // Same as the button above
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 3%;
  &:hover {
    background-color: #0056b3;
  }
}
`

const CommentEditDeleteBox = styled.div`
  display: flex;
  width: 100%;

  p {
    width: 90%;
  }
`


const ParticipantModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DropdownMenuDiv = styled.div`
  display: flex;
  gap: 10px;
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
    resize: none; // 사용자가 textarea 크기를 변경하지 못하게 함
    border: 1px solid #cccccc; // Light gray border
  }

  button {
    width: 10%;
    background-color: #007bff; // Same as the button above
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
`;

const PostDetailFirstBox = styled.div`

  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
`;

const EditDeleteButtonBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px;
  gap: 10px;
  // font-family: "San Francisco", Arial, sans-serif;
`;

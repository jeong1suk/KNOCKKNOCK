import styled from "styled-components";

const UserPostAndParticipants = () => {
  return (
    <Userbox>
      <Postbox>내가 쓴 Post</Postbox>
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

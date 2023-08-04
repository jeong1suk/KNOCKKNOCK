import React from 'react';
import styled from 'styled-components';


const ParticipantList = ({ participantsList, handleAccept, handleReject, selectedOption }) => {
  return (
    <ParticipantModalDiv>
      {participantsList.map((participant, index) => (
        
        <Card key={index}>
          <Image src={participant.profile_image} alt="profile" />
          <Info>
            <p>Nickname: {participant.User.nickname}</p>
            <p>Gender: {participant.User.gender}</p>
            <p>Age: {participant.User.age}</p>
            <p>Job: {participant.User.job}</p>
          </Info>
          {selectedOption == "신청인원" ?
          <Actions>
            <Button onClick={() => handleAccept(participant.participantId)}>수락</Button>
            <Button onClick={() => handleReject(participant.participantId)}>거절</Button>
          </Actions>
          :
            <Actions>
            </Actions>
          }
          
        </Card>
      ))}
    </ParticipantModalDiv>
  );
};

export default ParticipantList;

const ParticipantModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 20px;
  height: 500px;
  overflow-y: auto;
`;


const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  background: #007BFF;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px 2px;
  cursor: pointer;
  border-radius: 5px;
`;
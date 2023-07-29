import React from 'react';
import styled from 'styled-components';



const GenderInfo = ({ total, filled, color }) => {
  let people = [];

  for (let i = 0; i < total; i++) {
    people.push(<Person key={i} filled={i < filled} color={color} />);
  }

  return <TotalPeople>{people}</TotalPeople>;
};

export default GenderInfo;

const TotalPeople = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Person = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${props => props.filled ? props.color : '#ccc'};
  margin-right: 2px;
`;
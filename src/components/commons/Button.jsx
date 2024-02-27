import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Button(props) {
  console.log(props);

  const { label, onClick, disabled } = props;

  return <StGoWritePageBtn onClick={onClick}>{label}</StGoWritePageBtn>;
}

export default Button;

const StGoWritePageBtn = styled.button`
  /* margin-right: 50px; */
  /* margin-top: 10px; */
  margin: 0px 10px;
  padding: 10px;
  border-radius: 5px;
  border-color: #212529;
  background-color: #212529;
  color: #ffff;
  cursor: pointer;
  &:hover {
    background-color: #2a292b;
    border-color: #2a292b;
  }
`;

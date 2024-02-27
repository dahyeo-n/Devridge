import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function Button() {
  const navigate = useNavigate();

  const goToWritePage = () => {
    navigate(`/write`);
  };

  return <StGoWritePageBtn onClick={goToWritePage}>글쓰기</StGoWritePageBtn>;
}

export default Button;

const StGoWritePageBtn = styled.button`
  margin: 10px;
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

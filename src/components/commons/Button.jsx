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
  padding: 4px;
  border-radius: 4px;
  border-color: #141315;
  background-color: #141315;
  color: #ffff;
  cursor: pointer;
  &:hover {
    background-color: #2a292b;
    border-color: #2a292b;
  }
`;

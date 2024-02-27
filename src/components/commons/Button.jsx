import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export function WriteButton() {
  const navigate = useNavigate();

  const goToWritePage = () => {
    navigate(`/write`);
  };

  return <StGoWritePageBtn onClick={goToWritePage}>글쓰기</StGoWritePageBtn>;
}

const StGoWritePageBtn = styled.button`
  margin-right: 50px;
  margin-top: 10px;
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

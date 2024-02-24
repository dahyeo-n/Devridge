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
`;

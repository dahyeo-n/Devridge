import React from 'react';
import styled from 'styled-components';

function Button(props) {
  const { label, onClick, disabled } = props;

  return <StPublicBtn onClick={onClick}>{label}</StPublicBtn>;
}

export default Button;

const StPublicBtn = styled.button`
  margin: 0px 10px;
  padding: 10px;
  border-radius: 5px;
  border-color: #212529;
  background-color: #212529;
  color: #ffff;
  cursor: pointer;
  &:hover {
    background-color: #3f3e3f;
    border-color: #2a292b;
  }
`;

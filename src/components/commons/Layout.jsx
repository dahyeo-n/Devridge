import React from 'react';
import styled from 'styled-components';
import Header from './Header';

function Layout() {
  return <></>;
}

export default Layout;

const StHomeButton = styled.button`
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

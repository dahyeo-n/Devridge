import styled from 'styled-components';
import Button from '../commons/Button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const gotoWritePage = () => {
    navigate(`/write`);
  };

  const gotoHome = () => {
    navigate(`/`);
  };

  return (
    <StDevRidgeHeader>
      <StDevRidgeTitle onClick={gotoHome}>Devridge</StDevRidgeTitle>
      <Button onClick={gotoWritePage} label={'글쓰기'} />
    </StDevRidgeHeader>
  );
}

export default Header;

const StDevRidgeHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 90%;
`;

const StDevRidgeTitle = styled.h1`
  width: 71px;
  height: 32px;
  margin: 10px;
  padding-left: 50px;
  font-weight: 600px;
  font-size: 25px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  cursor: pointer;
`;

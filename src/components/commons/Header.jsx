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
    <>
      <StHeader>
        <StH1Tag onClick={gotoHome}>DevRidge</StH1Tag>

        <Button onClick={gotoWritePage} label={'글쓰기'} />
      </StHeader>
    </>
  );
}

export default Header;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between; // 수정
  margin-bottom: 5px;
  width: 100%; // 추가
`;

const StH1Tag = styled.h1`
  width: 71px;
  height: 32px;
  margin: 10px;
  padding-left: 50px;
  font-weight: 600px;
  font-size: 25px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  cursor: pointer;
`;

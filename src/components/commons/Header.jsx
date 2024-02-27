import styled from 'styled-components';
import { WriteButton } from '../commons/Button';

function Header() {
  return (
    <>
      <StHeader>
        <StH1Tag>DevRidge</StH1Tag>

        <WriteButton />
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
`;

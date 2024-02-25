import styled from 'styled-components';
import Button from '../commons/Button';

function Header() {
  return (
    <>
      <StHeader>
        <StH1Tag>DevRidge</StH1Tag>

        <Button />
      </StHeader>
    </>
  );
}

export default Header;

const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 5px;
`;

const StH1Tag = styled.h1`
  margin: 10px;
  padding-left: 10px;
`;

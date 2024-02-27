import styled from 'styled-components';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <StPaginationUi className="pagination">
        {pageNumbers.map((number) => (
          <StPaginationIndex key={number} className="page-item">
            <StPaginationBtn onClick={() => paginate(number)} className="page-link">
              {number}
            </StPaginationBtn>
          </StPaginationIndex>
        ))}
      </StPaginationUi>
    </nav>
  );
}

export default Pagination;

const StPaginationUi = styled.nav`
  display: flex;
`;

const StPaginationIndex = styled.li`
  padding: 4px;
`;

const StPaginationBtn = styled.button`
  background-color: #141513;
  border-color: #141513;
  padding: 10px;
  margin: 4px;
  border-radius: 4px;
  color: #ffff;

  &:hover {
    cursor: pointer;
    background-color: #4c4d4c;
    border-color: #4c4d4c;
  }
`;

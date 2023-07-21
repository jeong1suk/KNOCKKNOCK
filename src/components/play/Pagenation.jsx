import React from 'react';
import styled from 'styled-components';

function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const pages = [...Array(lastPage).keys()].map((_, index) => index + 1);

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {'<'}
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {'>'}
      </PageButton>
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
import React from 'react';
import styled from 'styled-components';

function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const pages = [...Array(lastPage).keys()].map((_, index) => index + 1);
  
  // 페이지네이션에서 보여줄 최대 페이지 수
  const maxPageLimit = 10;
  
  // 시작 페이지를 계산
  let startPage = Math.floor((currentPage - 1) / maxPageLimit) * maxPageLimit;
  
  // 실제 페이지네이션에서 보여질 페이지들
  let visiblePages = pages.slice(startPage, startPage + maxPageLimit);

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {'<'}
      </PageButton>

      {startPage > 0 && 
        <PageButton onClick={() => setCurrentPage(startPage)}>
          {'...'}
        </PageButton>
      }

      {visiblePages.map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PageButton>
      ))}

      {startPage + maxPageLimit < lastPage && 
        <PageButton onClick={() => setCurrentPage(startPage + maxPageLimit + 1)}>
          {'...'}
        </PageButton>
      }

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
  background-color: ${props => props.active ? 'grey' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
`;

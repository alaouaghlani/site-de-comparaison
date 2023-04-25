import React from 'react';
import { Button } from 'react-bootstrap';

function Pagination({
  totalVoiliers,
  voilierPerPage,
  setCurrentPage,
  currentPage,
}) {
  const pageNumber = [];
  for (let i = 0; i < Math.ceil(totalVoiliers / voilierPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      {pageNumber.map((page, index) => {
        return (
          <Button key={index} onClick={() => setCurrentPage(page)}>
            {page == currentPage ? 'active' : ''}
            {page}
          </Button>
        );
      })}
    </div>
  );
}

export default Pagination;

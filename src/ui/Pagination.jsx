import React from "react";
import styled from "styled-components";
import Button from "./Button";

const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-grey-100);
    }

    &.active {
      background-color: var(--color-brand-600);
      color: white;
      border-color: var(--color-brand-600);
    }

    &:disabled {
      color: var(--color-grey-400);
      cursor: not-allowed;
    }
  }
`;

function Pagination({ pageCount, onPageChange, currentPage }) {
  if (!pageCount || pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <PaginationContainer>
      <Button
        type="medium"
        variation="secondary"
        onClick={() => onPageChange({ selected: currentPage + 1 })}
        disabled={currentPage === 0}>
        <span>&#11164; Previous</span>
      </Button>

      {pages.map((page) => (
        <Button
          type="medium"
          variation="ghost"
          key={page}
          onClick={() => onPageChange({ selected: page })}
          className={currentPage === page ? "active" : ""}>
          {page + 1}
        </Button>
      ))}

      <Button
        type="medium"
        variation="secondary"
        onClick={() => onPageChange({ selected: currentPage - 1 })}
        disabled={currentPage === pageCount - 1}>
        <span>Next &#11166; </span>
      </Button>
    </PaginationContainer>
  );
}

export default Pagination;

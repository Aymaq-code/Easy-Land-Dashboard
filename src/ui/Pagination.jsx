// src/ui/Pagination.jsx
import React from "react";
import styled from "styled-components";
import Button from "./Button";

const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  padding: 1rem;

  @media (max-width: 640px) {
    gap: 0.4rem;

    button {
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
    }
  }
`;

const PageButton = styled.button`
  min-width: 3.6rem;
  height: 3.6rem;
  padding: 0 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  background: var(--color-grey-0);
  color: var(--color-grey-700);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: var(--color-grey-100);
    border-color: var(--color-brand-400);
    transform: translateY(-1px);
  }

  &.active {
    background-color: var(--color-brand-600);
    color: white;
    border-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    min-width: 3rem;
    height: 3rem;
    padding: 0 0.6rem;
    font-size: 1.2rem;
  }
`;

const Ellipsis = styled.span`
  padding: 0 0.5rem;
  color: var(--color-grey-500);
`;

function Pagination({ pageCount, onPageChange, currentPage, maxVisible = 5 }) {
  if (!pageCount || pageCount <= 1) return null;

  // Calculate which page numbers to show (with ellipsis for many pages)
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(pageCount - 1, startPage + maxVisible - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 0;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < pageCount - 1;

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange({ selected: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount - 1) {
      onPageChange({ selected: currentPage + 1 });
    }
  };

  return (
    <PaginationContainer>
      <Button
        size="medium"
        variation="secondary"
        onClick={handlePrevious}
        disabled={currentPage === 0}
        aria-label="Previous page">
        ← Previous
      </Button>

      {/* First page button with ellipsis */}
      {showStartEllipsis && (
        <>
          <PageButton onClick={() => onPageChange({ selected: 0 })}>
            1
          </PageButton>
          <Ellipsis>...</Ellipsis>
        </>
      )}

      {/* Visible page buttons */}
      {visiblePages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange({ selected: page })}
          className={currentPage === page ? "active" : ""}
          aria-label={`Go to page ${page + 1}`}
          aria-current={currentPage === page ? "page" : undefined}>
          {page + 1}
        </PageButton>
      ))}

      {/* Last page button with ellipsis */}
      {showEndEllipsis && (
        <>
          <Ellipsis>...</Ellipsis>
          <PageButton onClick={() => onPageChange({ selected: pageCount - 1 })}>
            {pageCount}
          </PageButton>
        </>
      )}

      <Button
        size="medium"
        variation="secondary"
        onClick={handleNext}
        disabled={currentPage === pageCount - 1}
        aria-label="Next page">
        Next →
      </Button>
    </PaginationContainer>
  );
}

export default Pagination;

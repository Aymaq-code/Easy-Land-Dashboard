// src/ui/DataTitlesRes.jsx
import styled from "styled-components";

const ToursResponsiveHeader = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-grey-100);
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;

const BookingsResponsiveHeader = styled.div`
  display: none;

  @media screen and (max-width: 930px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--color-grey-100);
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;

function DataTitlesRes({ type }) {
  if (type === "tour") {
    return (
      <ToursResponsiveHeader>
        <div>Tour Details</div>
      </ToursResponsiveHeader>
    );
  }

  return (
    <BookingsResponsiveHeader>
      <div>Booking Information</div>
    </BookingsResponsiveHeader>
  );
}

export default DataTitlesRes;

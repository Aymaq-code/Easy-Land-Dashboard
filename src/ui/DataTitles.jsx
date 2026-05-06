import styled from "styled-components";

const ToursHeaderRow = styled.div`
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  padding: 1.2rem 1.6rem;
  border-radius: 10px 10px 0 0;

  display: grid;
  grid-template-columns: 30% 25% 19% 20%;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BookingHeadrRow = styled.div`
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  padding: 1.2rem 1.6rem;
  border-radius: 10px 10px 0 0;

  display: grid;
  grid-template-columns: 10% 20% 19% 19% 1fr;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 10% 24% 19% 19% 1fr;
  }
  @media screen and (max-width: 930px) {
    display: none;
  }
`;

const HeaderCell = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-grey-700);
`;

function PageTitles({ type }) {
  if (type === "tour") {
    return (
      <ToursHeaderRow>
        <HeaderCell>Tour</HeaderCell>
        <HeaderCell>Capacity</HeaderCell>
        <HeaderCell>Price</HeaderCell>
        <HeaderCell>Discount</HeaderCell>
      </ToursHeaderRow>
    );
  }

  return (
    <BookingHeadrRow>
      <HeaderCell>Tour</HeaderCell>
      <HeaderCell>Guest</HeaderCell>
      <HeaderCell>Dates</HeaderCell>
      <HeaderCell>Status</HeaderCell>
      <HeaderCell>Amount</HeaderCell>
    </BookingHeadrRow>
  );
}

export default PageTitles;

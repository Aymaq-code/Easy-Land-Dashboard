import styled from "styled-components";

const ToursHeaderRow = styled.div`
  display: none;
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  padding: 15px;
  border-radius: 11px;
  overflow-x: scroll;
  scrollbar-width: none;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-rows: 30% 20% 19% 1fr;
    grid-row: 1 / -1;
  }

  @media screen and (max-width: 663px) {
    padding: 10px;
  }

  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const BookingHeadrRow = styled.div`
  display: none;
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
  padding: 15px;
  border-radius: 11px;
  overflow-x: scroll;
  scrollbar-width: none;

  @media screen and (max-width: 930px) {
    display: grid;
    grid-template-rows: 15% 21% 22% 17% 1fr;
    grid-row: 1 / -1;
  }
  @media screen and (max-width: 663px) {
    grid-template-rows: 13% 21% 22% 17% 1fr;
    padding: 10px;
  }

  @media screen and (max-width: 300px) {
    display: none;
  }
  > * {
    //border: 2px solid red;
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

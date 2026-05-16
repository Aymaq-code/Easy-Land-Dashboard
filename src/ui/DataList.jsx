import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  //align-items: center;
  flex-direction: column;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    background-color: var(--color-grey-0);
    border: 0.5px solid var(--color-grey-200);
    // grid-template-columns: 1fr 1fr;
    //grid-template-rows: 1fr 1fr;
    border-radius: 11px;
    padding: 5px;
  }
  @media screen and (max-width: 768px) {
    //border: 2px solid blue;
  }
  @media screen and (max-width: 663px) {
    grid-template-columns: 17% 1fr;
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: 20% 1fr;
  }
  @media screen and (max-width: 520px) {
    grid-template-columns: 22% 1fr;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 25% 1fr;
  }
  @media screen and (max-width: 410px) {
    grid-template-columns: 30% 1fr;
  }
  @media screen and (max-width: 360px) {
    grid-template-columns: 37% 1fr;
  }
`;

export const ToursDataList = styled.li`
  display: grid;
  grid-template-columns: 31% 24% 19% 1fr 1fr;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0 0.5rem 0.4rem 0;

  @media screen and (max-width: 768px) {
    grid-row: 1 / -1;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-template-rows: 20% 10% 10% 10% 1fr;
    gap: 2rem 0;
    box-shadow: none;
    border: none;
    border-radius: 0;
    padding: 10px;
  }

  @media screen and (max-width: 405px) {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
`;

export const BookingContainer = styled.div`
  display: grid;

  @media screen and (max-width: 930px) {
    background-color: var(--color-grey-0);
    border: 0.5px solid var(--color-grey-200);
    box-shadow: var(--shadow-sm);
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    border-radius: 11px;
    padding: 5px;
  }
`;

export const BookingsDataList = styled.li`
  display: grid;
  grid-template-columns: 10% 20% 18% 20% 20% 1fr;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0 1rem;

  @media screen and (max-width: 930px) {
    grid-row: 1 / -1;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem 0;
    padding: 10px;
    border: none;
    box-shadow: none;
  }

  @media screen and (max-width: 406px) {
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
`;

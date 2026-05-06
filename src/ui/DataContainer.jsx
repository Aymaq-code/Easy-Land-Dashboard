import styled from "styled-components";

const DataContainer = styled.div`
  margin-top: 4rem;
  box-shadow: var(--shadow-sm);
  border-radius: 15px 15px 0 0;

  display: flex;
  flex-direction: column;
  gap: 2rem 0;

  @media screen and (max-width: 768px) {
    margin-top: 3rem;
    gap: 1rem 0;
  }
`;

export default DataContainer;

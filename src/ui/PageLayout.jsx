import styled from "styled-components";

const PageLayout = styled.section`
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 14px;
  box-shadow: var(--shadow-sm);

  @media screen and (max-width: 768px) {
    padding: 15px;
    border-radius: 0;
  }
`;

export default PageLayout;

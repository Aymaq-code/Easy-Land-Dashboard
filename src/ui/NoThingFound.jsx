import styled from "styled-components";

const Contents = styled.div`
  color: var(--color-grey-600);
  font-size: 1.4rem;
  margin: 0 auto;
`;

function NoThingFound({ children }) {
  return <Contents>{children}</Contents>;
}

export default NoThingFound;

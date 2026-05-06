import styled from "styled-components";
import Filter from "./Filter";
import SortBy from "./SortBy";
import Heading from "./Heading";

const ControlsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 1rem;
  margin-bottom: 1.6rem;

  @media screen and (max-width: 1000px) {
    flex-wrap: wrap;
    gap: 1rem 0;
    width: 100%;

    & h2 {
      align-self: flex-start;
    }
  }
`;

function PageHead({ type }) {
  return (
    <ControlsGroup>
      <Heading as="h2">
        {type === "tours" ? "All Tours" : "All Bookings"}
      </Heading>

      <ControlsGroup>
        <Filter filterType={type} />
        <SortBy sortType={type} />
      </ControlsGroup>
    </ControlsGroup>
  );
}
export default PageHead;

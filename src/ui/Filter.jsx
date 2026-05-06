// Filter.jsx
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const FilterContainer = styled.div`
  gap: 0.5rem;
  border: 1px solid var(--color-grey-200);
  padding: 0.25rem;
  border-radius: 12px;

  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-around;
    gap: 0 2rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 8px;
  background: ${(props) =>
    props.active ? "var(--color-brand-500)" : "transparent"};
  color: ${(props) =>
    props.active ? "var(--color-grey-0)" : "var(--color-grey-600)"};
  border: ${(props) =>
    props.active ? "1px solid var(--color-grey-200)" : "none"};
  box-shadow: ${(props) => props.active && "var(--shadow-sm)"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-600);
    background: ${(props) => !props.active && "var(--color-grey-50)"};
  }

  @media screen and (max-width: 370px) {
    width: 100%;
  }
`;

const toursFilterOptions = [
  { label: "All", value: "all" },
  { label: "No discount", value: "no-discount" },
  { label: "With discount", value: "with-discount" },
];

const bookingsFilterOptions = [
  { label: "All", value: "all" },
  { label: "Checked out", value: "checked-out" },
  { label: "Checked in", value: "checked-in" },
  { label: "Unconfirmed", value: "unconfirmed" },
];

const dashboardFilterOptions = [
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Last 90 days", value: "90days" },
];

function Filter({ filterType = "tours" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine which filter options to use based on filterType
  const getFilterOptions = () => {
    if (filterType === "tours") return toursFilterOptions;
    if (filterType === "bookings") return bookingsFilterOptions;
    if (filterType === "dashboard") return dashboardFilterOptions;
    return toursFilterOptions;
  };

  const filterOptions = getFilterOptions();

  // Get the current filter value from URL params
  const getParamName = () => {
    if (filterType === "tours") return "discount";
    if (filterType === "bookings") return "status";
    if (filterType === "dashboard") return "dashboardPeriod";
    return "discount";
  };

  const paramName = getParamName();

  // Set different default values based on filter type
  const getDefaultValue = () => {
    if (filterType === "dashboard") return "7days";
    return "all";
  };

  const currentFilter = searchParams.get(paramName) || getDefaultValue();

  function handleFilter(value) {
    // For dashboard, always set the parameter (don't delete on "all" since there is no "all")
    if (filterType === "dashboard") {
      searchParams.set(paramName, value);
    } else if (value === "all") {
      searchParams.delete(paramName);
    } else {
      searchParams.set(paramName, value);
    }

    // Preserve sortBy if it exists
    const currentSortBy = searchParams.get("sortBy");
    if (currentSortBy) {
      searchParams.set("sortBy", currentSortBy);
    }

    setSearchParams(searchParams);
  }

  return (
    <FilterContainer>
      {filterOptions.map((option) => (
        <FilterButton
          key={option.value}
          active={currentFilter === option.value}
          onClick={() => handleFilter(option.value)}>
          {option.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

export default Filter;

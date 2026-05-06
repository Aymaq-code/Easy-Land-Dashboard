// SortBy.jsx
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Select = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 12px;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const toursSortOptions = [
  { label: "Sort by name (A-Z)", value: "name-asc" },
  { label: "Sort by price (low to high)", value: "price-asc" },
  { label: "Sort by price (high to low)", value: "price-desc" },
];

const bookingsSortOptions = [
  { label: "Sort by date (newest first)", value: "date-desc" },
  { label: "Sort by date (oldest first)", value: "date-asc" },
  { label: "Sort by price (low to high)", value: "price-asc" },
  { label: "Sort by price (high to low)", value: "price-desc" },
];

function SortBy({ sortType = "tours" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions =
    sortType === "tours" ? toursSortOptions : bookingsSortOptions;
  const currentSort = searchParams.get("sortBy") || sortOptions[0]?.value;

  function handleSort(e) {
    const value = e.target.value;

    if (value) {
      searchParams.set("sortBy", value);
    } else {
      searchParams.delete("sortBy");
    }

    // Preserve filter if it exists
    const filterParam = sortType === "tours" ? "discount" : "status";
    if (searchParams.get(filterParam)) {
      searchParams.set(filterParam, searchParams.get(filterParam));
    }

    setSearchParams(searchParams);
  }

  return (
    <Select value={currentSort} onChange={handleSort}>
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SortBy;

// hooks/useFilterAndSort.js
import { useSearchParams } from "react-router-dom";

export function useFilterAndSort(type, data) {
  const [searchParams] = useSearchParams();

  let filteredData = [...data];

  // Apply filters based on type
  if (type === "tours") {
    const discountFilter = searchParams.get("discount") || "all";

    if (discountFilter === "no-discount") {
      filteredData = filteredData.filter((item) => {
        const discount = item.discount;
        return !discount || discount === 0 || discount === "0";
      });
    } else if (discountFilter === "with-discount") {
      filteredData = filteredData.filter((item) => {
        const discount = item.discount;
        return discount && discount > 0 && discount !== "0";
      });
    }
  } else if (type === "bookings") {
    const statusFilter = searchParams.get("status") || "all";

    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.status === statusFilter,
      );
    }
  }

  // Apply sorting
  const sortBy = searchParams.get("sortBy");
  if (sortBy) {
    const [field, direction] = sortBy.split("-");

    filteredData.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Handle different field types
      if (field === "totalPrice" || field === "price") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (
        field === "startDate" ||
        field === "endDate" ||
        field === "date"
      ) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (field === "name") {
        aValue = a.title?.toLowerCase() || a.clientName?.toLowerCase() || "";
        bValue = b.title?.toLowerCase() || b.clientName?.toLowerCase() || "";
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  return filteredData;
}

// hooks/useDashboardFilter.js
import { useSearchParams } from "react-router-dom";

export function useDashboardFilter() {
  const [searchParams] = useSearchParams();

  const selectedPeriod = searchParams.get("dashboardPeriod") || "7days";

  const getDateRange = () => {
    const today = new Date();
    const startDate = new Date();

    switch (selectedPeriod) {
      case "30days":
        startDate.setDate(today.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(today.getDate() - 90);
        break;
      case "7days":
      default:
        startDate.setDate(today.getDate() - 7);
        break;
    }

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
  };

  const filterDataByDateRange = (data) => {
    const { startDate, endDate } = getDateRange();

    return data.filter((item) => {
      const itemDate = new Date(item.startDate);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  };

  return {
    selectedPeriod,
    dateRange: getDateRange(),
    filterDataByDateRange,
  };
}

import { useMemo } from "react";

export function useGenerateNumericId(tours) {
  const generateId = useMemo(() => {
    if (!tours || tours.length === 0) return 1;

    const maxId = Math.max(...tours.map((tour) => Number(tour.id)));
    return maxId + 1;
  }, [tours]);

  return generateId;
}

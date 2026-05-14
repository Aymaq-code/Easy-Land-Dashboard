import { useQuery } from "@tanstack/react-query";
import { tourApi } from "../../services/apiTours";

export function useTour(id) {
  return useQuery({
    queryKey: ["tours", id],
    queryFn: () => tourApi.getById(id),
    enabled: !!id, // Only run query if we have an ID
  });
}

import { useQuery } from "@tanstack/react-query";
import { tourApi } from "../../services/apiTours";

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: tourApi.getAll,
  });
}

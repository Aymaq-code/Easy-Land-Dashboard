import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/apiUsers";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });
}

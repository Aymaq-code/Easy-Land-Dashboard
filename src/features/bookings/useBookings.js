import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "../../services/apiBookings";

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: bookingApi.getAll,
  });
}

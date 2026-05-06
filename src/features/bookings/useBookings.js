import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
  });

  return { data, isLoading, error };
}

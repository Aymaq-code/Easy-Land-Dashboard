import { useQuery } from "@tanstack/react-query";

async function getBookings() {
  const res = await fetch(
    "https://69fedbea8c70b15fa3caca22.mockapi.io/bookings",
  );

  if (!res.ok) throw new Error("Failed to fetch bookings");

  return await res.json();
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
}

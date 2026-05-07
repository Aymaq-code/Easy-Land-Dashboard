import { useQuery } from "@tanstack/react-query";

async function getBookings() {
  const res = await fetch("https://69fc7b9cfce564e25918225f.mockapi.io/data");

  if (!res.ok) throw new Error("Failed to fetch bookings");

  const data = await res.json();

  return data?.[0]?.bookings || [];
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
}

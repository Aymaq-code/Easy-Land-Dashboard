import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  const res = await fetch("https://69fc7b9cfce564e25918225f.mockapi.io/data");

  if (!res.ok) throw new Error("Failed to fetch users");

  const data = await res.json();

  return data?.[0]?.users || [];
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

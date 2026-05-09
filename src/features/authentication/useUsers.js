import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  const res = await fetch("https://69fc7b9cfce564e25918225f.mockapi.io/users");

  if (!res.ok) throw new Error("Failed to fetch users");

  return await res.json();
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

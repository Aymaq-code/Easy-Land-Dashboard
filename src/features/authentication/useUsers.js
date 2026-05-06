import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  const res = await fetch("http://localhost:3000/users");

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

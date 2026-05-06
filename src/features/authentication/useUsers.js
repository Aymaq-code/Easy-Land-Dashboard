import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://10.0.30.13:3000";

async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/users`);

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}

import { useQuery } from "@tanstack/react-query";

export function useTours() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/tours");
      if (!res.ok) throw new Error("Failed to fetch tours");
      return res.json();
    },
  });

  return { data, isLoading, error };
}

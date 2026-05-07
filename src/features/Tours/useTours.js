import { useQuery } from "@tanstack/react-query";

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await fetch(
        "https://69fc7b9cfce564e25918225f.mockapi.io/data",
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      return data?.[0]?.tours || [];
    },
  });
}

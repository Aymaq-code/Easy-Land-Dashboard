import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTour) => {
      const res = await fetch("http://localhost:3000/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      });

      if (!res.ok) throw new Error("Failed to create tour");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Tour created Successfully!");
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (context) => {
      toast.error("Faild to create tour");
      queryClient.setQueryData(["tours"], context.previousData);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, editTour }) => {
      const res = await fetch(`http://localhost:3000/tours/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTour),
      });

      if (!res.ok) throw new Error("Failed to update details");
      return res.json();
    },

    onSuccess: () => {
      toast.success("Tour updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:3000/tours/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Failed to delete tour ${id}`);
      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries(["tours"]);

      const previousData = queryClient.getQueryData(["tours"]);

      queryClient.setQueryData(["tours"], (old) =>
        old.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Tour deleted successfuly");
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (context) => {
      toast.error("Failed to delete tour");
      queryClient.setQueryData(["tours"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tours"]);
    },
  });
}

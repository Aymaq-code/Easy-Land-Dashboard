import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tourApi } from "../../services/apiTours";

export function useDeleteTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourApi.delete,

    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tours"] });

      // Snapshot the previous data
      const previousData = queryClient.getQueryData(["tours"]);

      // Optimistically update to remove the tour
      queryClient.setQueryData(["tours"], (old) =>
        old?.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Tour deleted successfully!");
    },

    onError: (error, id, context) => {
      toast.error(error.message || "Failed to delete tour");
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(["tours"], context.previousData);
      }
    },

    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}

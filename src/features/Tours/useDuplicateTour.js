import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tourApi } from "../../services/apiTours";

export function useDuplicateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tour) => {
      // Create a duplicate tour without the id
      const { id, ...duplicateTour } = tour;

      // Add "Copy" to the title
      const newTour = {
        ...duplicateTour,
        title: `${tour.title} (Copy)`,
      };

      console.log("Duplicating tour:", newTour);

      // Use the create method from tourApi
      return await tourApi.create(newTour);
    },

    onSuccess: () => {
      toast.success("Tour duplicated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      console.error("Duplicate error:", error);
      toast.error(error.message || "Failed to duplicate tour");
    },
  });
}

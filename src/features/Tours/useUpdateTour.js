import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tourApi } from "../../services/apiTours";

export function useUpdateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourApi.update,

    onSuccess: () => {
      toast.success("Tour updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update tour");
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { tourApi } from "../../services/apiTours";

export function useCreateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tourApi.create,

    onSuccess: () => {
      toast.success("Tour created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create tour");
    },
  });
}

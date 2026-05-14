import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.create,

    onSuccess: () => {
      toast.success("Tour created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create tour");
    },
  });
}

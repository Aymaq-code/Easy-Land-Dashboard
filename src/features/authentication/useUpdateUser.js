import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userApi } from "../../services/apiUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.create,

    onSuccess: () => {
      toast.success("User updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

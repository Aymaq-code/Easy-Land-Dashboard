import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userApi } from "../../services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.delete,

    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous data
      const previousData = queryClient.getQueryData(["users"]);

      // Optimistically update to remove the tour
      queryClient.setQueryData(["users"], (old) =>
        old?.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("User deleted successfully!");
    },

    onError: (error, id, context) => {
      toast.error(error.message || "Failed to delete user");
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(["tours"], context.previousData);
      }
    },

    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

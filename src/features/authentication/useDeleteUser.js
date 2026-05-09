import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `https://69fc7b9cfce564e25918225f.mockapi.io/users/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error(`Failed to delete tour ${id}`);
      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries(["users"]);

      const previousData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) =>
        old.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("User deleted successfuly!");
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (context) => {
      toast.error("Failed to delete user!");
      queryClient.setQueryData(["tours"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}

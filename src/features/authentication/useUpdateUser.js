import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, editUser }) => {
      const res = await fetch(
        `https://69fc7b9cfce564e25918225f.mockapi.io/users/${id}`,
        {
          method: "PUT", // As the PATCH is not supporting with MockAPI so i used PUT method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        },
      );

      if (!res.ok) throw new Error("Failed to update details");

      return res.json();
    },

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

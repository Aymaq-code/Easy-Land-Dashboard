import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser) => {
      const res = await fetch(
        "https://69fc7b9cfce564e25918225f.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        },
      );

      if (!res.ok) throw new Error("Faild to create user!");

      return res.json();
    },

    onSuccess: () => {
      toast.success("New user created Successfully!");
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (context) => {
      toast.error("Faild to create new user!");
      queryClient.setQueryData(["tours"], context.previousData);
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCheckin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, changeStatus }) => {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeStatus),
      });

      if (!res.ok) throw new Error("Failed to update checkin");
      return res.json();
    },

    onSuccess: (data, variables) => {
      const status = variables.changeStatus.status;

      toast.success(
        status === "checked-in"
          ? "Checked-in successfully ✅"
          : "Checked-out successfully 👋",
      );

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}

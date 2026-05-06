import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Failed to delete booking ${id}`);
      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries(["bookings"]);

      const previousData = queryClient.getQueryData(["bookings"]);

      queryClient.setQueryData(["tours"], (old) =>
        old.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Bookings deleted successfuly");
      queryClient.invalidateQueries(["tours"]);
    },

    onError: (context) => {
      toast.error("Failed to delete bookings");
      queryClient.setQueryData(["bookings"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });
}

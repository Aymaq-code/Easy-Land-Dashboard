import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingApi.delete,

    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["bookings"] });

      // Snapshot the previous data
      const previousData = queryClient.getQueryData(["bookings"]);

      // Optimistically update to remove the booking
      queryClient.setQueryData(["bookings"], (old) =>
        old?.filter((item) => item.id !== id),
      );

      return { previousData };
    },

    onSuccess: () => {
      toast.success("Booking deleted successfully!");
    },

    onError: (error, id, context) => {
      toast.error(error.message || "Failed to delete tour");
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(["bookings"], context.previousData);
      }
    },

    onSettled: () => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

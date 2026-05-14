// features/bookings/useCheckin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookingApi } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingApi.update,

    onSuccess: (data, variables) => {
      const status = variables.changeStatus.status;

      toast.success(
        status === "checked-in"
          ? "Checked-in successfully!"
          : "Checked-out successfully!",
      );

      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update checkin status");
    },
  });
}

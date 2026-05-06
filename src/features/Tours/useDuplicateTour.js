// useDuplicateTour.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDuplicateTour() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tour) => {
      // Create a duplicate tour without the id
      const { id, ...duplicateTour } = tour;

      // Add "Copy" to the title and generate new id
      const newTour = {
        ...duplicateTour,
        id: Date.now(), // Generate new unique id
        title: `${tour.title} (Copy)`,
      };

      console.log("Duplicating tour:", newTour); // Debug log

      const res = await fetch(`http://localhost:3000/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTour),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error("API Error:", errorData);
        throw new Error(`Failed to duplicate tour: ${res.status}`);
      }

      const data = await res.json();
      console.log("Duplicate response:", data); // Debug log
      return data;
    },

    onSuccess: () => {
      toast.success("Tour duplicated successfully!");
      // Invalidate and refetch tours
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },

    onError: (error) => {
      console.error("Duplicate error:", error);
      toast.error(error.message || "Failed to duplicate tour");
    },
  });
}

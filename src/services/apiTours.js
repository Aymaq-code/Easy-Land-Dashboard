export const tourApi = {
  getAll: async () => {
    const res = await fetch(
      "https://69fc7b9cfce564e25918225f.mockapi.io/tours",
    );

    if (!res.ok) throw new Error(`Failed to fetch tours: ${res.status}`);

    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/tours/${id}`,
    );

    if (!res.ok) throw new Error(`Failed to fetch tour: ${res.status}`);

    return res.json();
  },

  create: async (newTour) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/tours`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      },
    );
    if (!res.ok) throw new Error("Failed to create tour");
    return res.json();
  },

  update: async ({ id, editTour }) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/tours/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTour),
      },
    );
    if (!res.ok) throw new Error("Failed to update tour");
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/tours/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) throw new Error("Failed to delete tour");
    return res.json();
  },
};

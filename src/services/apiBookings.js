export const bookingApi = {
  getAll: async () => {
    const res = await fetch(
      "https://69fedbea8c70b15fa3caca22.mockapi.io/bookings",
    );

    if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.status}`);
    return await res.json();
  },

  update: async ({ id, changeStatus }) => {
    const res = await fetch(
      `https://69fedbea8c70b15fa3caca22.mockapi.io/bookings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changeStatus),
      },
    );

    if (!res.ok) throw new Error("Failed to update booking");
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(
      `https://69fedbea8c70b15fa3caca22.mockapi.io/bookings/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) throw new Error("Failed to delete booking");
    return res.json();
  },
};

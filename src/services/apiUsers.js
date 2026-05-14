export const userApi = {
  getAll: async () => {
    const res = await fetch(
      "https://69fc7b9cfce564e25918225f.mockapi.io/users",
    );
    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

    return res.json();
  },

  create: async (newUser) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      },
    );

    if (!res.ok) throw new Error("Failed to create users!");

    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(
      `https://69fc7b9cfce564e25918225f.mockapi.io/users/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) throw new Error("Failed to delete tour");
    return res.json();
  },
};

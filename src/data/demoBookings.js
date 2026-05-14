const today = new Date().toLocaleDateString("en-CA");

// Helper function for dynamic dates
const getDate = (daysOffset) => {
  const date = new Date();

  date.setDate(date.getDate() + daysOffset);

  return date.toLocaleDateString("en-CA");
};

export const demoBookings = [
  {
    id: 1001,
    clientName: "John Smith",
    country: "https://flagcdn.com/us.svg",
    startDate: today,
    endDate: getDate(4),
    nights: 4,
    guests: 2,
    totalPrice: 620,
    breakfastCost: 40,
    status: "checked-in",
  },

  {
    id: 1002,
    clientName: "Emma Watson",
    country: "https://flagcdn.com/gb.svg",
    startDate: today,
    endDate: getDate(2),
    nights: 2,
    guests: 1,
    totalPrice: 280,
    breakfastCost: 20,
    status: "unconfirmed",
  },

  {
    id: 1003,
    clientName: "Ali Khan",
    country: "https://flagcdn.com/ae.svg",
    startDate: getDate(-5),
    endDate: today,
    nights: 5,
    guests: 3,
    totalPrice: 890,
    breakfastCost: 60,
    status: "checked-out",
  },

  {
    id: 1004,
    clientName: "Sophia Brown",
    country: "https://flagcdn.com/ca.svg",
    startDate: getDate(-3),
    endDate: today,
    nights: 3,
    guests: 2,
    totalPrice: 540,
    breakfastCost: 35,
    status: "checked-out",
  },

  {
    id: 1005,
    clientName: "Michael Lee",
    country: "https://flagcdn.com/au.svg",
    startDate: today,
    endDate: getDate(5),
    nights: 5,
    guests: 3,
    totalPrice: 940,
    breakfastCost: 80,
    status: "checked-in",
  },

  {
    id: 1006,
    clientName: "Daniel Kim",
    country: "https://flagcdn.com/kr.svg",
    startDate: getDate(-6),
    endDate: getDate(-1),
    nights: 5,
    guests: 2,
    totalPrice: 720,
    breakfastCost: 55,
    status: "checked-out",
  },

  {
    id: 1007,
    clientName: "Olivia Davis",
    country: "https://flagcdn.com/fr.svg",
    startDate: getDate(-2),
    endDate: getDate(3),
    nights: 5,
    guests: 4,
    totalPrice: 1180,
    breakfastCost: 90,
    status: "checked-in",
  },

  {
    id: 1008,
    clientName: "Noah Wilson",
    country: "https://flagcdn.com/de.svg",
    startDate: getDate(-1),
    endDate: getDate(6),
    nights: 7,
    guests: 2,
    totalPrice: 1350,
    breakfastCost: 120,
    status: "checked-in",
  },

  {
    id: 1009,
    clientName: "Lucas Martin",
    country: "https://flagcdn.com/it.svg",
    startDate: getDate(-4),
    endDate: getDate(1),
    nights: 5,
    guests: 1,
    totalPrice: 680,
    breakfastCost: 45,
    status: "checked-in",
  },

  {
    id: 1010,
    clientName: "Ava Thompson",
    country: "https://flagcdn.com/se.svg",
    startDate: getDate(-7),
    endDate: getDate(-2),
    nights: 5,
    guests: 2,
    totalPrice: 810,
    breakfastCost: 65,
    status: "checked-out",
  },
];

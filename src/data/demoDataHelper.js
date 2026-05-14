import { demoBookings } from "./demoBookings";
import { demoTours } from "./demoTours";

// Flag to control whether to use demo data
let useDemoData = true;

export const setUseDemoData = (value) => {
  useDemoData = value;
};

export const getUseDemoData = () => useDemoData;

// Enhanced API functions that can return demo data
export const fetchDemoBookings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoBookings);
    }, 500); // Simulate network delay
  });
};

export const fetchDemoTours = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(demoTours);
    }, 500);
  });
};

// Statistics for dashboard
export const getDashboardStats = (bookings, tours) => {
  const totalBookings = bookings.length;
  const totalSales = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeCheckins = bookings.filter(
    (b) => b.status === "checked-in",
  ).length;

  const totalCapacity = tours.reduce((sum, t) => sum + Number(t.capacity), 0);
  const totalGuests = bookings
    .filter((b) => b.status === "checked-in")
    .reduce((sum, b) => sum + b.guests, 0);
  const occupancyRate = totalCapacity
    ? Math.round((totalGuests / totalCapacity) * 100)
    : 0;

  return {
    totalBookings,
    totalSales,
    activeCheckins,
    occupancyRate,
  };
};

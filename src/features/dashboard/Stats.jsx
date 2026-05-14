import styled from "styled-components";

import { useBookings } from "../bookings/useBookings";
import { useTours } from "../Tours/useTours";

import {
  CalendarCheck,
  TrendingUp,
  Users,
  ChartNoAxesCombined,
} from "lucide-react";

import { formatCurrency } from "../../utils/helpers";
import { demoBookings } from "../../data/demoBookings";
import MiniSpinner from "../../ui/MiniSpinner";
import ErrorComponent from "../../ui/ErrorComponent";

const StatsContainer = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const StatsCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  & svg {
    font-size: clamp(2.5rem, 5vw, 5rem);
    transition: transform 0.2s ease;

    @media screen and (max-width: 507px) {
      font-size: clamp(5rem, 5vw, 8rem);
    }
  }

  &:hover svg {
    transform: scale(1.05);
  }

  & p {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    font-weight: 520;

    & span:nth-child(1) {
      font-size: 1.3rem;
      color: var(--color-grey-500);
      letter-spacing: 0.5px;
    }

    & span:nth-child(2) {
      font-size: 1.8rem;
      color: var(--color-grey-700);
      font-weight: 600;
    }
  }

  @media screen and (max-width: 507px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StateErrorMsg = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.6rem 2rem;

  border: 1px solid var(--color-red-800);
  border-left: 5px solid var(--color-red-800);

  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: var(--color-grey-500);
  font-size: 1.4rem;
  font-weight: 500;

  text-align: center;
`;

function Stats({ dateRange }) {
  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useBookings();
  const {
    data: tours = [],
    isEnabled: toursLoading,
    error: toursError,
  } = useTours();

  // Use API data if available otherwise demo data
  const activeBookings = bookings.length > 0 ? bookings : demoBookings;

  // Filter bookings by date range
  const filteredBookings = activeBookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate).setHours(0, 0, 0, 0);
    const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  // Total bookings
  const totalBookings = filteredBookings.length || 10;

  // Total sales
  const subtotalAllPrice = filteredBookings.reduce(
    (sum, booking) => sum + Number(booking.totalPrice || 0),
    0,
  );

  const checkedInBookings = filteredBookings.filter(
    (b) => b.status?.toLowerCase() === "checked-in",
  );

  // Checked in guests
  const allCheckins = checkedInBookings.length || 4;

  // Tours total capacity
  const totalCapacity = tours.length
    ? tours.reduce((sum, tour) => sum + Number(tour.capacity || 0), 0)
    : 20;

  // Guests checked in
  const totalGuestsCheckedIn =
    checkedInBookings.reduce((sum, b) => sum + Number(b.guests || 0), 0) || 12;

  // Occupancy
  const occupancyRate =
    totalCapacity > 0
      ? Math.round((totalGuestsCheckedIn / totalCapacity) * 100)
      : 68;

  if (bookingsLoading || !toursLoading)
    return <MiniSpinner text="Loading state data" />;

  if (bookingsError || toursError)
    return (
      <StateErrorMsg>
        <p>Failed to load bookings and tours data.</p>
      </StateErrorMsg>
    );

  return (
    <StatsContainer>
      <StatsCard>
        <CalendarCheck
          size={48}
          strokeWidth={1.5}
          style={{ color: "var(--color-blue-700)" }}
        />
        <p>
          <span>BOOKINGS</span>
          <span>{totalBookings}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <TrendingUp
          size={48}
          strokeWidth={1.5}
          style={{ color: "var(--color-green-700)" }}
        />
        <p>
          <span>SALES</span>
          <span>{formatCurrency(subtotalAllPrice)}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <Users
          size={48}
          strokeWidth={1.5}
          style={{ color: "var(--color-indigo-700)" }}
        />
        <p>
          <span>CHECK INS</span>
          <span>{allCheckins}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <ChartNoAxesCombined
          size={48}
          strokeWidth={1.5}
          style={{ color: "var(--color-orange-600)" }}
        />
        <p>
          <span>OCCUPANCY</span>
          <span>{occupancyRate}%</span>
        </p>
      </StatsCard>
    </StatsContainer>
  );
}

export default Stats;

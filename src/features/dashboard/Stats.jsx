import styled from "styled-components";
import { useBookings } from "../bookings/useBookings";
import { SiBookingdotcom } from "react-icons/si";
import Spinner from "../../ui/Spinner";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoCalendar, IoStatsChartSharp } from "react-icons/io5";
import { formatCurrency } from "../../utils/helpers";
import { useTours } from "../Tours/useTours";

const StatsContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; */

  padding: 20px 0;

  display: grid;
  //grid-template-columns: repeat(auto-fit, minmax(24%, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;

  /* @media screen and (max-width: 1013px) {
    gap: 0.5rem 1rem;
  } */
`;

const StatsCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);

  display: grid;
  grid-template-columns: 0.4fr 1fr;

  & svg {
    font-size: clamp(2.5rem, 5vw, 5rem);

    @media screen and (max-width: 507px) {
      font-size: clamp(5rem, 5vw, 8rem);
    }
  }
  & p {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;

    font-weight: 520;

    & span:nth-child(1) {
      font-size: 1.3rem;
      color: var(--color-grey-500);
    }
    & span:nth-child(2) {
      font-size: 1.8rem;
      color: var(--color-grey-700);
    }
  }

  @media screen and (max-width: 507px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function Stats({ dateRange }) {
  const { data: bookings = [] } = useBookings();
  const { data: tours = [] } = useTours();

  // Filter bookings by date range
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  const totalBookings = filteredBookings.length;

  const subtotalAllPrice = filteredBookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );

  const allCheckins = filteredBookings.filter(
    (b) => b.status === "checked-in",
  ).length;

  const totalCapacity = tours.reduce(
    (sum, tour) => sum + Number(tour.capacity),
    0,
  );

  const totalGuestsCheckedIn = filteredBookings
    .filter((b) => b.status === "checked-in")
    .reduce((sum, b) => sum + b.guests, 0);

  const occupancyRate = totalCapacity
    ? Math.round((totalGuestsCheckedIn / totalCapacity) * 100)
    : 0;

  return (
    <StatsContainer>
      <StatsCard>
        <SiBookingdotcom style={{ color: "var(--color-blue-700)" }} />
        <p>
          <span>BOOKINGS</span>
          <span>{totalBookings}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <FaMoneyBillTrendUp style={{ color: "var(--color-green-700)" }} />
        <p>
          <span>SALES</span>
          <span>{formatCurrency(subtotalAllPrice)}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <IoCalendar style={{ color: "var(--color-indigo-700)" }} />
        <p>
          <span>CHECK INS</span>
          <span>{allCheckins}</span>
        </p>
      </StatsCard>

      <StatsCard>
        <IoStatsChartSharp style={{ color: "var(--color-yellow-700)" }} />
        <p>
          <span>OCCUPANCY</span>
          <span>{occupancyRate}%</span>
        </p>
      </StatsCard>
    </StatsContainer>
  );
}

export default Stats;

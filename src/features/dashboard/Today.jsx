import styled from "styled-components";

import { useBookings } from "../bookings/useBookings";

import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import MiniSpinner from "../../ui/MiniSpinner";
import ErrorComponent from "../../ui/ErrorComponent";

import { demoBookings } from "../../data/demoBookings";

const TodayLayout = styled.div`
  width: 50%;
  height: 330px;
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;

  padding: 10px 0;

  border-bottom: 1px solid var(--color-grey-200);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;

  text-align: center;

  background-color: ${(props) =>
    props.type === "arriving" ? "rgba(34,197,94,0.2)" : "rgba(59,130,246,0.2)"};

  color: ${(props) =>
    props.type === "arriving"
      ? "var(--color-green-700)"
      : "var(--color-blue-700)"};
`;

const Flag = styled.img`
  width: 20px;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
`;

const Name = styled.span`
  font-weight: 500;
`;

const Nights = styled.span`
  color: var(--color-grey-500);
`;

const EmptyMessage = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-grey-500);
  text-align: center;
`;

function Today({ dateRange }) {
  const { data: bookings = [], isLoading, error } = useBookings();

  // Use API data if available otherwise demo data
  const activeBookings = bookings.length > 0 ? bookings : demoBookings;

  if (isLoading) return <MiniSpinner />;

  if (error) return <ErrorComponent />;

  // Normalize today's date
  const today = new Date().toLocaleDateString("en-CA");

  // Filter by dashboard date range
  const filteredBookings = activeBookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate).setHours(0, 0, 0, 0);

    const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);

    const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);

    return bookingDate >= startDate && bookingDate <= endDate;
  });

  // Today's arrivals/departures
  const arrivals = filteredBookings.filter((b) => b.startDate === today);

  const departures = filteredBookings.filter((b) => b.endDate === today);

  // Fallback demo content for portfolio/demo mode
  const finalArrivals =
    arrivals.length > 0 ? arrivals : demoBookings.slice(0, 2);

  const finalDepartures =
    departures.length > 0 ? departures : demoBookings.slice(2, 4);

  return (
    <TodayLayout>
      <Heading as="h3">Today</Heading>

      <br />

      {bookings.length === 0 && (
        <p
          style={{
            color: "#9ca3af",
            fontSize: "12px",
            marginBottom: "1rem",
          }}>
          Demo data preview
        </p>
      )}

      {finalDepartures.length === 0 && finalArrivals.length === 0 ? (
        <EmptyMessage>
          No arrivals or departures scheduled for today.
        </EmptyMessage>
      ) : (
        <>
          {/* Departures */}
          {finalDepartures.map((b) => (
            <Row key={`departure-${b.id}`}>
              <Badge type="departing">DEPARTING</Badge>

              <Left>
                <Flag src={b.country} alt="flag" />
                <Name>{b.clientName}</Name>
              </Left>

              <Nights>{b.nights} nights</Nights>

              <Button size="medium">{b.status}</Button>
            </Row>
          ))}

          {/* Arrivals */}
          {finalArrivals.map((b) => (
            <Row key={`arrival-${b.id}`}>
              <Badge type="arriving">ARRIVING</Badge>

              <Left>
                <Flag src={b.country} alt="flag" />
                <Name>{b.clientName}</Name>
              </Left>

              <Nights>{b.nights} nights</Nights>

              <Button size="medium">{b.status}</Button>
            </Row>
          ))}
        </>
      )}
    </TodayLayout>
  );
}

export default Today;

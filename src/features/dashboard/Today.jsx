import styled from "styled-components";
import { useBookings } from "../bookings/useBookings";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import MiniSpinner from "../../ui/MiniSpinner";
import ErrorComponent from "../../ui/ErrorComponent";
import NoThingFound from "../../ui/NoThingFound";

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

  padding: 7px 0;
  border-bottom: 1px solid var(--color-grey-200);
  border-top: 1px solid var(--color-grey-200);
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

function Today({ dateRange }) {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) return <MiniSpinner />;
  if (error) return <ErrorComponent />;

  // Filter bookings by date range first
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  const today = new Date().toISOString().split("T")[0];

  const arrivals = filteredBookings.filter((b) => b.startDate === today);
  const departures = filteredBookings.filter((b) => b.endDate === today);

  if (arrivals.length === 0 && departures.length === 0)
    return (
      <NoThingFound>
        No arrivals or departures scheduled for today.
      </NoThingFound>
    );
  return (
    <TodayLayout>
      <Heading as="h3">Today</Heading>
      <br />
      {/* Departures */}
      {departures.map((b) => (
        <Row key={b.id}>
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
      {arrivals.map((b) => (
        <Row key={b.id}>
          <Badge type="arriving">ARRIVING</Badge>
          <Left>
            <Flag src={b.country} alt="flag" />
            <Name>{b.clientName}</Name>
          </Left>

          <Nights>{b.nights} nights</Nights>

          <Button size="medium">{b.status}</Button>
        </Row>
      ))}
    </TodayLayout>
  );
}

export default Today;

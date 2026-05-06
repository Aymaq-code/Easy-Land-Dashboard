import { useNavigate, useParams } from "react-router";
import { useBookings } from "./useBookings";
import styled, { css } from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import StatusTag from "../../ui/StatusTag";
import { useTours } from "../Tours/useTours";
import { formatDate, formatDistanceFromNow } from "../../utils/helpers";
import BookingInfo from "../../ui/BookingInfo";

const DetailsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--color-grey-0);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 30px;

  @media screen and (max-width: 768px) {
    border-radius: 0;
    padding: 10px;
  }
  @media screen and (max-width: 507px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-brand-600) 0%,
    var(--color-brand-500) 100%
  );
  padding: 2.5rem;
  color: var(--color-grey-0);
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }

  @media screen and (max-width: 507px) {
    padding: 1rem;
    border-radius: 0;
  }
`;

const Ptag = styled.p`
  color: var(--color-grey-50);
  font-size: 1.4rem;

  ${(props) =>
    props.size == "sm" &&
    css`
      font-size: 1.2rem;
      color: var(--color-grey-200);
    `}
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  border: 2px solid red;
  margin-top: 2rem;

  & p {
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const ClientInfo = styled.div`
  background-color: var(--color-grey-200);
  width: 50%;
  padding: 15px;
  border-radius: 8px;
`;

const TourDetails = styled.div`
  background-color: var(--color-grey-200);
  width: 50%;
  padding: 15px;
  border-radius: 8px;
`;

function BookingDetails() {
  const { data: bookings, isLoading, error } = useBookings();
  const { data: tours } = useTours();
  const { id } = useParams();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Booking not found</p>;

  const booking = bookings?.find((b) => String(b.id) === id);
  const tour = tours?.find((t) => String(t.id) === String(booking?.tourId));

  return (
    <DetailsContainer>
      <Header>
        <Row type="horizontal">
          <Row type="vertical">
            <Row type="horizontal" resp="sm">
              <Heading as="h3">Booking #{booking.id}</Heading>
              <StatusTag status={booking.status}>{booking.status}</StatusTag>
            </Row>
            <Row type="vertical">
              <Ptag>
                {booking.nights} nights <b>{tour.title}</b>
              </Ptag>

              <Ptag size="sm">
                {formatDate(booking.startDate)}{" "}
                <span>({formatDistanceFromNow(booking.startDate)})</span> -{" "}
                {formatDate(booking.endDate)}
              </Ptag>
            </Row>
          </Row>
          <Row style={{ alignSelf: "start" }}>
            <Button
              variation="secondary"
              onClick={() => navigate(-1)}
              navigate={navigate}>
              ← Back
            </Button>
          </Row>
        </Row>
      </Header>

      <BookingInfo booking={booking} tour={tour} />
    </DetailsContainer>
  );
}

export default BookingDetails;

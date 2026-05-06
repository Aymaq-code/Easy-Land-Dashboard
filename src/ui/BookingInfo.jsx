import React from "react";
import styled from "styled-components";
import Row from "./Row";
import { formatCurrency } from "../utils/helpers";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useDeleteBooking } from "../features/bookings/useDeleteBooking";
import { useCheckin } from "../features/bookings/useCheckin";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;

  & h4 {
    font-size: 1.4rem;
    margin-bottom: 1.3rem;
    color: var(--color-grey-700);

    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.7rem;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const Info = styled.div`
  background-color: var(--color-grey-50);
  width: 50%;
  padding: 10px 15px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  & p {
    font-size: 1.3rem;
    margin-top: 0.3rem;
    color: var(--color-grey-700);

    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 15rem 0 0;

    @media screen and (max-width: 507px) {
      grid-template-columns: 1fr;
    }

    & b {
      font-size: 1.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 507px) {
    padding: 10px;
    border-radius: 0;
    flex-direction: column;
  }
`;

const Observation = styled.div`
  background-color: var(--color-grey-50);
  padding: 10px 15px;
  margin-top: 2rem;
  border-radius: 8px;

  & h4 {
    font-size: 1.4rem;
    margin-bottom: 1.3rem;
    color: var(--color-grey-700);
  }

  & i {
    position: relative;
    font-size: 1%.6;
    line-height: 1.6;
    color: var(--color-grey-800);
    padding: 1rem 2rem;
  }

  & i::before,
  & i::after {
    position: absolute;
    font-size: 4rem;
    color: var(--color-grey-300);
    font-family: serif;
  }

  & i::before {
    content: "“";
    top: -10px;
    left: 0;
  }

  & i::after {
    content: "”";
    bottom: -20px;
    right: 0;
  }
  @media screen and (max-width: 507px) {
    padding: 10px;
    border-radius: 0;
  }
`;

const PaymentDisplay = styled.div`
  background-color: var(--color-grey-50);
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 2rem;

  & p {
    width: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (max-width: 507px) {
    padding: 10px;
    border-radius: 0;
  }
`;

function BookingInfo({ booking, tour }) {
  const { mutate: deleteBooking } = useDeleteBooking();
  const { mutate: changeCheckin } = useCheckin();

  const breakfastCost =
    booking.breakfast === true
      ? Number(booking.breakfastCost) * booking.nights * booking.guests
      : 0;

  const subtotal = breakfastCost + tour.price;

  const navigate = useNavigate();

  function handleCheckin() {
    const checkin = {
      status: booking.status === "checked-in" ? "checked-out" : "checked-in",
      isPaid: true,
    };

    changeCheckin({
      id: booking.id,
      changeStatus: checkin,
    });
  }

  return (
    <>
      <InfoContainer>
        <Info>
          <h4>
            <img
              src={booking.country}
              alt="country flag"
              width={24}
              height={16}
            />
            CLIENT INFORMATION
          </h4>

          <p>
            <b>Client:</b>

            {booking.clientName}
          </p>
          <p>
            <b>Guests:</b> {booking.guests} guest
          </p>
          <p>
            <b>Email:</b> {booking.email}
          </p>
          <p>
            <b>National ID:</b> {booking.nationalId}
          </p>
        </Info>
        <Info>
          <h4>
            <img src={tour.country} alt="country flag" width={24} height={16} />
            TOUR DETAILS
          </h4>
          <p>
            <b>Package:</b> {tour.title}
          </p>
          <p>
            <b>Duration:</b> {booking.nights} nights
          </p>
          <p>
            <b>Capacity:</b> {tour.capacity} capacity
          </p>
          <p>
            <b>Breakfast:</b> {booking.breakfast ? "✅ Yes" : "❌  No"}{" "}
          </p>
        </Info>
      </InfoContainer>
      <Observation>
        <h4>📝 OBSERVATIONS</h4>
        <i>{booking.observations}</i>
      </Observation>

      <PaymentDisplay>
        <Row type="vertical">
          <p>
            <span>Total price: {booking.nights} nights</span>
            <span>{formatCurrency(tour.price)}</span>
          </p>
          <p>
            <span>
              {booking.breakfast &&
                `Breakfast (days ${booking.nights}x${booking.guests} guests):`}
            </span>
            <span>
              <span>{booking.breakfast && formatCurrency(breakfastCost)}</span>
            </span>
          </p>

          <p>
            <span>Total nights:</span>
            <span>{booking.nights} nights</span>
          </p>
        </Row>
        <br />
        <hr />
        <Row type="vertical" mt="lg">
          <p
            style={{
              fontWeight: "700",
              fontSize: "1.5rem",
            }}>
            <span>Total price:</span>
            <span
              style={{
                color: "var(--color-blue-700)",
              }}>
              {formatCurrency(subtotal)}
            </span>
          </p>

          <p
            style={{
              fontWeight: "700",
              fontSize: "1.5rem",
            }}>
            <span>Status:</span>
            <span
              style={
                booking.isPaid
                  ? {
                      color: "#0b0b0b",
                      backgroundColor: "#ecd13a",
                      padding: "4px 20px",
                      borderRadius: "50px",
                    }
                  : {
                      color: "#464444",
                      backgroundColor: "#ecd13a",
                      padding: "4px 20px",
                      borderRadius: "50px",
                    }
              }>
              {booking.isPaid ? "PAID" : "UN-PAID"}
            </span>
          </p>
        </Row>
      </PaymentDisplay>

      <Row mt="lg" type="horizontal" style={{ justifySelf: "end" }}>
        {booking.status !== "checked-out" && (
          <Button size="large" onClick={handleCheckin}>
            {booking.status === "checked-in" ? "Check out" : "Check in"}
          </Button>
        )}
        <Button
          variation="danger"
          size="large"
          onClick={() => {
            deleteBooking(booking.id);
            navigate(-1);
          }}>
          Delete
        </Button>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Row>
    </>
  );
}

export default BookingInfo;

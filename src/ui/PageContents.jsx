import { useState } from "react";
import styled from "styled-components";

import { useTours } from "../features/Tours/useTours";
import { useBookings } from "../features/bookings/useBookings";
import { useDeleteTour } from "../features/Tours/useDeleteTour";
import { useDeleteBooking } from "../features/bookings/useDeleteBooking";
import { useFilterAndSort } from "../hooks/useFilterAndSort";

import {
  BookingContainer,
  BookingsDataList,
  Container,
  ToursDataList,
} from "./DataList";

import StyledImage from "./DataImg";
import Heading from "./Heading";
import KebabMenu from "./KebabMenu";
import StatusTag from "./StatusTag";
import Pagination from "./Pagination";
import ConfirmDelete from "./ConfirmDelete";

import DataTitlesRes from "../ui/DataTitlesRes";

import { formatCurrency, formatDate } from "../utils/helpers";

const ContentsLayout = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem 0;
`;

const TourRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const CapacityT = styled.p`
  font-size: 1.3rem;
  color: var(--color-grey-700);
  text-align: left;
`;

const DiscountT = styled.p`
  font-size: 1.2rem;
  font-weight: 550;
  color: ${(props) =>
    props.hasDiscount ? "#2b8a3e" : "var(--color-grey-500)"};
`;

const GuestBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  font-size: 1.3rem;
  font-weight: 600;

  & span:last-child {
    font-size: 1.2rem;
    font-weight: 300;
    color: var(--color-grey-500);
  }
`;

const DatesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--color-grey-500);
  font-size: 1.4rem;
`;

function PageContents({ type, onEditTour }) {
  const [tourToDelete, setTourToDelete] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: toursData = [] } = useTours();
  const { data: bookingsData = [] } = useBookings();
  const { mutate: deleteTour } = useDeleteTour();
  const { mutate: deleteBooking } = useDeleteBooking();

  // Get raw data based on type
  const rawData = type === "tours" ? toursData : bookingsData;

  // Apply filters and sorting using custom hook
  const filteredData = useFilterAndSort(type, rawData);

  const itemsPerPage = type === "tours" ? 5 : 7;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // Reset to first page if current page is out of range
  const validPage = currentPage >= pageCount && pageCount > 0 ? 0 : currentPage;
  const startIndex = validPage * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  function handlePageChange({ selected }) {
    setCurrentPage(selected);
  }

  function handleConfirmDeleteTour() {
    if (!tourToDelete) return;

    deleteTour(tourToDelete.id);

    setTourToDelete(null);
  }

  function handleConfirmDeleteBooking() {
    if (!bookingToDelete) return;

    deleteBooking(bookingToDelete.id);

    setBookingToDelete(null);
  }

  return (
    <>
      <ContentsLayout>
        {type === "tours" &&
          currentData.map((tour) => (
            <Container>
              <DataTitlesRes type={"tour"} />
              <ToursDataList key={tour.id}>
                <TourRow>
                  <StyledImage src={tour.image} />
                  <Heading as={"h4"} variant="h4">
                    {tour.title}
                  </Heading>
                </TourRow>

                <CapacityT>{tour.capacity} persons or more</CapacityT>

                <Heading as="h4" style={{ textAlign: "left" }}>
                  {formatCurrency(tour.price)}
                </Heading>

                <DiscountT
                  hasDiscount={tour.discount > 0 && tour.discount !== "0"}>
                  {tour.discount && tour.discount > 0 && tour.discount !== "0"
                    ? `${tour.discount}% OFF`
                    : "—"}
                </DiscountT>

                <KebabMenu
                  type="tours"
                  id={tour.id}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  deleteTour={() => setTourToDelete(tour)}
                  tourData={tour}
                  onEditTour={onEditTour}
                />
              </ToursDataList>

              {tourToDelete && (
                <ConfirmDelete
                  resourceName={tourToDelete.title}
                  onConfirm={handleConfirmDeleteTour}
                  onClose={() => setTourToDelete(null)}
                />
              )}
            </Container>
          ))}

        {type === "bookings" &&
          currentData.map((booking) => (
            <BookingContainer>
              <DataTitlesRes type={"booking"} />
              <BookingsDataList key={booking.id}>
                <Heading as="h4">{booking.id}</Heading>

                <GuestBox>
                  <span>{booking.clientName}</span>
                  <span>{booking.email}</span>
                </GuestBox>

                <DatesBox>
                  <span>{formatDate(booking.startDate)}</span>
                  <span>{formatDate(booking.endDate)}</span>
                </DatesBox>

                <StatusTag status={booking.status}>{booking.status}</StatusTag>

                <Heading as="h4">
                  {booking.totalPrice
                    ? formatCurrency(booking.totalPrice)
                    : "—"}
                </Heading>

                <KebabMenu
                  type="bookings"
                  status={booking.status}
                  id={booking.id}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  deleteBooking={() => setBookingToDelete(booking)}
                />
              </BookingsDataList>
              {bookingToDelete && (
                <ConfirmDelete
                  resourceName={bookingToDelete.clientName}
                  onConfirm={handleConfirmDeleteBooking}
                  onClose={() => setBookingToDelete(null)}
                />
              )}
            </BookingContainer>
          ))}

        {currentData.length === 0 && (
          <EmptyState>No {type} found with the selected filters</EmptyState>
        )}
      </ContentsLayout>

      {filteredData.length > 0 && (
        <Pagination
          pageCount={pageCount}
          currentPage={validPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default PageContents;

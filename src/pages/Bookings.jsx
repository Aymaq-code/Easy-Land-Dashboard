import { useBookings } from "../features/bookings/useBookings";

import PageLayout from "../ui/PageLayout";
import PageContents from "../ui/PageContents";
import PageHead from "../ui/PageHead";

import Row from "../ui/Row";
import Heading from "../ui/Heading";
import DataTitles from "../ui/DataTitles";
import DataContainer from "../ui/DataContainer";

import Button from "../ui/Button";
import BookingUpdateForm from "../features/bookings/BookingDetails";
import SimpleToursComponent from "../ui/ToursListEnhanced";

import Spinner from "../ui/Spinner";
import ErrorComponent from "../ui/ErrorComponent";

function Bookings() {
  const { data, isLoading, error } = useBookings();

  if (isLoading) return <Spinner />;
  if (!data || data.length === 0)
    return (
      <SimpleToursComponent
        title="No bookings yet"
        message="There are no bookings to display."
      />
    );
  if (error) return <ErrorComponent />;

  return (
    <PageLayout>
      <PageHead type="bookings" />

      <DataContainer>
        <DataTitles type="bookin" />
        <PageContents type="bookings" />
      </DataContainer>
    </PageLayout>
  );
}

export default Bookings;

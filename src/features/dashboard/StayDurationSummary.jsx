import styled from "styled-components";
import { useBookings } from "../bookings/useBookings";
import MiniSpinner from "../../ui/MiniSpinner";
import Heading from "../../ui/Heading";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import SimpleToursComponent from "../../ui/ToursListEnhanced";
import ErrorComponent from "../../ui/ErrorComponent";
import NoThingFound from "../../ui/NoThingFound";

const SummaryLayout = styled.div`
  width: 50%;
  height: 330px;
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: 15px;
  }

  @media screen and (max-width: 420px) {
    height: 400px;
    text-align: center;
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media screen and (max-width: 420px) {
    flex-direction: column;
    gap: 1rem 0;
    width: 100% !important;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const ColorDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const COLORS = ["#f97316", "#eab308", "#84cc16"];

function StayDurationSummary({ dateRange }) {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) return <MiniSpinner />;
  if (error) return <ErrorComponent />;

  // Filter bookings by date range
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return bookingDate >= startDate && bookingDate <= endDate;
  });

  const summaryData = [
    {
      name: "1–3 nights",
      value: filteredBookings.filter((b) => b.nights >= 1 && b.nights <= 3)
        .length,
    },
    {
      name: "4–7 nights",
      value: filteredBookings.filter((b) => b.nights >= 4 && b.nights <= 7)
        .length,
    },
    {
      name: "8+ nights",
      value: filteredBookings.filter((b) => b.nights >= 8).length,
    },
  ].filter((item) => item.value > 0);

  if (summaryData.length == 0)
    return <NoThingFound>No stay duration data for this period.</NoThingFound>;

  return (
    <SummaryLayout>
      <Heading as="h3">Stay duration summary</Heading>

      <ChartWrapper>
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}>
              {summaryData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <Legend>
          {summaryData.map((item, index) => (
            <LegendItem key={item.name}>
              <ColorDot color={COLORS[index % COLORS.length]} />
              <span>
                {item.name} ({item.value})
              </span>
            </LegendItem>
          ))}
        </Legend>
      </ChartWrapper>
    </SummaryLayout>
  );
}

export default StayDurationSummary;

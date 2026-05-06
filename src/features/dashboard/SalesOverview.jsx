import styled from "styled-components";
import { useBookings } from "../bookings/useBookings";
import MiniSpinner from "../../ui/MiniSpinner";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../utils/helpers";
import NoThingFound from "../../ui/NoThingFound";

const Layout = styled.div`
  width: 100%;
  height: 340px;
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  margin-top: 3rem;
`;

function SalesOverview({ dateRange }) {
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

  // group by date
  const salesMap = {};

  filteredBookings.forEach((b) => {
    const date = b.startDate;

    if (!salesMap[date]) {
      salesMap[date] = {
        date,
        total: 0,
        extras: 0,
      };
    }

    salesMap[date].total += Number(b.totalPrice || 0);
    salesMap[date].extras += Number(b.breakfastCost || 0);
  });

  // convert to array
  const data = Object.values(salesMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  if (!data.length)
    return (
      <NoThingFound>No sales data available for this period.</NoThingFound>
    );

  return (
    <Layout>
      <Heading as="h3">
        Sales from {formatDate(data[0]?.date)} —{" "}
        {formatDate(data[data.length - 1]?.date)}
      </Heading>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: "#6b7280" }}
          />

          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fill: "#6b7280" }}
          />

          <Tooltip
            formatter={(value) => `$${value}`}
            labelFormatter={(label) => formatDate(label)}
          />

          {/* TOTAL SALES */}
          <Area
            type="monotone"
            dataKey="total"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.2}
            strokeWidth={2}
          />

          {/* EXTRAS (breakfast) */}
          <Area
            type="monotone"
            dataKey="extras"
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Layout>
  );
}

export default SalesOverview;

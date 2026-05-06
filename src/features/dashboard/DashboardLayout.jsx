import { useDashboardFilter } from "../../hooks/useDashboardFilter";
import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Stats from "./Stats";
import Today from "./Today";
import StayDurationSummary from "./StayDurationSummary";
import SalesOverview from "./SalesOverview";
import Filter from "../../ui/Filter";

const StyledDashboardLayout = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 507px) {
    padding: 10px 0;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 0;
  }
`;

const DashRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 1rem;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    gap: 1rem 0;
  }
`;

function DashboardLayout() {
  const { dateRange } = useDashboardFilter();

  return (
    <StyledDashboardLayout>
      <Row type="horizontal" resp="sm">
        <Heading as="h2">Dashboard</Heading>
        <Filter filterType="dashboard" />
      </Row>
      <Stats dateRange={dateRange} />
      <DashRow type="horizontal" mt="lg">
        <Today dateRange={dateRange} />
        <StayDurationSummary dateRange={dateRange} />
      </DashRow>
      <SalesOverview dateRange={dateRange} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

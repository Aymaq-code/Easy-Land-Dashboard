import styled from "styled-components";
import Button from "./Button";

const NoDataWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border-radius: 8px;
  background: var(--color-grey-0);
  margin-bottom: 2rem;
`;

const NoDataTitle = styled.h3`
  color: var(--color-grey-600);
  margin-bottom: 8px;
  font-size: 20px;
`;

const NoDataText = styled.p`
  color: var(--color-grey-500);
  margin-bottom: 20px;
`;

const SimpleToursComponent = ({ title, message }) => {
  return (
    <NoDataWrapper>
      <NoDataTitle>{title}</NoDataTitle>
      <NoDataText>{message}</NoDataText>
      <Button size="large" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </NoDataWrapper>
  );
};

export default SimpleToursComponent;

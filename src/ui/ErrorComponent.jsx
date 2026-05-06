import styled from "styled-components";

const MessageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border-radius: 8px;
  background: var(--color-grey-0);
`;

const MessageIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const MessageTitle = styled.h3`
  color: var(--color-red-700);
  margin-bottom: 0.5rem;
`;

const MessageText = styled.p`
  color: var(--color-red-800);
  margin-bottom: 1rem;
`;

function ErrorComponent() {
  return (
    <MessageContainer type="error">
      <MessageIcon>⚠️</MessageIcon>
      <MessageTitle type="error">Error!</MessageTitle>
      <MessageText type="error">Something went wrong</MessageText>
    </MessageContainer>
  );
}

export default ErrorComponent;

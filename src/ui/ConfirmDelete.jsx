// src/ui/ConfirmDelete.jsx
import styled from "styled-components";
import Button from "./Button";
import Row from "./Row";
import Heading from "./Heading";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: var(--color-grey-0);
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  width: 90%;
  max-width: 500px;
  padding: 2.5rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    width: 95%;
    padding: 2rem;
    margin: 1rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 5rem;
`;

const Message = styled.p`
  text-align: center;
  margin: 1.5rem 0;
  color: var(--color-grey-600);
  font-size: 1.5rem;
  line-height: 1.5;
`;

const ResourceName = styled.span`
  font-weight: 600;
  color: var(--color-red-700);
  background: var(--color-red-100);
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  text-transform: capitalize;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;

  button {
    flex: 1;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const WarningText = styled.p`
  color: var(--color-red-600);
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  onClose,
  disabled = false,
  confirmText = "Delete",
  cancelText = "No",
}) {
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !disabled) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer role="dialog" aria-modal="true">
        <Row type="vertical">
          <IconWrapper>
            <span role="img" aria-label="warning">
              ⚠️
            </span>
          </IconWrapper>

          <Message>
            Are you sure you want to delete{" "}
            <ResourceName>"{resourceName}"</ResourceName>?
          </Message>

          <WarningText>⚠️ This action cannot be undone!</WarningText>

          <ButtonGroup>
            <Button
              variation="secondary"
              size="medium"
              onClick={onClose}
              disabled={disabled}>
              {cancelText}
            </Button>

            <Button
              variation="danger"
              size="medium"
              onClick={onConfirm}
              disabled={disabled}>
              {disabled ? "Deleting..." : confirmText}
            </Button>
          </ButtonGroup>
        </Row>
      </ModalContainer>
    </Overlay>
  );
}

export default ConfirmDelete;

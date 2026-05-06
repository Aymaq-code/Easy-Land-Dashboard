import styled from "styled-components";
import EditTourForm from "../features/Tours/TourUpdateForm";
import BookingEditForm from "../features/bookings/BookingUpdateForm";
import TourUpdateForm from "../features/Tours/TourUpdateForm";
import { useToggle } from "../hook/useToggle";
import PopupOverlay from "./PopupOverlay";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: var(--color-grey-0);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
`;

function PopupPage({ handlePopup }) {
  const { isOpen } = useToggle();

  return (
    // <Overlay onClick={handlePopup}>
    //   <ModalContainer onClick={(e) => e.stopPropagation()}>
    //     {!isOpen && <TourUpdateForm />}
    //   </ModalContainer>
    // </Overlay>

    <PopupOverlay></PopupOverlay>
  );
}

export default PopupPage;

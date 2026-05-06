import styled from "styled-components";
import {
  HiCheckCircle,
  HiDocumentDuplicate,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import ButtonIcon from "../ui/ButtonIcon";
import { MdEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { useGoTo } from "../hooks/useGoTo";
import { useDuplicateTour } from "../features/Tours/useDuplicateTour";

const KebabMenyLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const BtnContainer = styled.div`
  position: absolute;
  right: 0;
  top: 38px;
  z-index: 10;

  display: flex;
  flex-direction: column;
  min-width: 160px;

  background-color: var(--color-grey-50);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 6px;

  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & button {
    display: flex;
    align-items: center;
    gap: 10px;

    width: 100%;
    border-radius: 6px;
    padding: 10px 12px;

    font-size: 1.3rem;
    color: var(--color-grey-700);

    transition: all 0.2s;

    & svg {
      height: 18px;
      width: 18px;
    }

    &:hover {
      background-color: var(--color-grey-100);
    }
  }

  & .delete {
    color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-100);
    }
  }
`;

function KebabMenu({
  id,
  openMenuId,
  setOpenMenuId,
  type,
  deleteTour,
  deleteBooking,
  tourData,
  onEditTour,
}) {
  const { mutate: duplicateTour } = useDuplicateTour();
  const isOpen = openMenuId === id;

  function handleToggle(e) {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  const bookingDetails = useGoTo("/bookingDetails");

  function handBookingDetails() {
    bookingDetails(id);
  }

  function handleEditClick() {
    if (onEditTour && tourData) {
      onEditTour(tourData);
      setOpenMenuId(null);
    }
  }

  function handleDuplicate(e) {
    e.stopPropagation();
    if (tourData) {
      duplicateTour(tourData);
      setOpenMenuId(null);
    }
  }
  return (
    <KebabMenyLayout>
      <ButtonIcon onClick={handleToggle}>
        <HiOutlineDotsVertical />
      </ButtonIcon>

      {isOpen && (
        <BtnContainer onClick={(e) => e.stopPropagation()}>
          {type === "bookings" ? (
            <>
              <ButtonIcon>
                <HiCheckCircle />
                <span>Check in</span>
              </ButtonIcon>

              <ButtonIcon onClick={handBookingDetails}>
                <MdEdit />
                <span>See details</span>
              </ButtonIcon>
              <ButtonIcon className="delete" onClick={deleteBooking}>
                <IoTrashBin />
                <span>Delete</span>
              </ButtonIcon>
            </>
          ) : (
            <>
              <ButtonIcon onClick={handleDuplicate}>
                <HiDocumentDuplicate />
                <span>Duplicate</span>
              </ButtonIcon>

              <ButtonIcon onClick={handleEditClick}>
                <MdEdit />
                <span>Edit</span>
              </ButtonIcon>
              <ButtonIcon className="delete" onClick={deleteTour}>
                <IoTrashBin />
                <span>Delete</span>
              </ButtonIcon>
            </>
          )}
        </BtnContainer>
      )}
    </KebabMenyLayout>
  );
}

export default KebabMenu;

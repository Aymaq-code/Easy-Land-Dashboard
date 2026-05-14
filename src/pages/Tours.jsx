import { useState } from "react";
import styled from "styled-components";

import { useToggle } from "../hooks/useToggle";
import { useTours } from "../features/Tours/useTours";

import PageLayout from "../ui/PageLayout";
import PageHead from "../ui/PageHead";
import PageContents from "../ui/PageContents";

import Row from "../ui/Row";
import Heading from "../ui/Heading";
import DataTitles from "../ui/DataTitles";
import DataContainer from "../ui/DataContainer";
import Button from "../ui/Button";

import TourCreateFrom from "../features/Tours/TourCreateForm";
import TourUpdateForm from "../features/Tours/TourUpdateForm";
import SimpleToursComponent from "../ui/ToursListEnhanced";

import Spinner from "../ui/Spinner";
import ErrorComponent from "../ui/ErrorComponent";

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
  z-index: 10000;
`;

const ModalContainer = styled.div`
  background: var(--color-grey-0);
  border-radius: 20px;
  width: 90%;
  max-width: 650px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
`;

function Tours() {
  const { data, isLoading, error } = useTours();

  const { isOpen, handlePopup } = useToggle();

  const [editingTour, setEditingTour] = useState(null);

  function handleEditTour(tourData) {
    setEditingTour(tourData);
    handlePopup();
  }

  function handleCloseModal() {
    setEditingTour(null);
    handlePopup();
  }

  if (isLoading) return <Spinner />;
  if (error) return <ErrorComponent />;
  if (!data || data.length === 0)
    return (
      <SimpleToursComponent
        title="No tours yet"
        message="Get started by creating your first tour."
      />
    );

  return (
    <PageLayout>
      <PageHead type="tours" />

      <DataContainer>
        <DataTitles type="tour" />
        <PageContents type="tours" onEditTour={handleEditTour} />

        <Row style={{ alignSelf: "end" }}>
          <Button size="medium" onClick={handlePopup}>
            &#43; Create New Tour
          </Button>
        </Row>
      </DataContainer>

      {isOpen && (
        <Overlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            {editingTour ? (
              <TourUpdateForm
                tourData={editingTour}
                handlePopup={handleCloseModal}
              />
            ) : (
              <TourCreateFrom handlePopup={handleCloseModal} />
            )}
          </ModalContainer>
        </Overlay>
      )}
    </PageLayout>
  );
}

export default Tours;

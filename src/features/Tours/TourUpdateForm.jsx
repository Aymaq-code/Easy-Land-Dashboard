import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUpdateTour } from "./useUpdateTour";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";
import { MdOutlineCancel } from "react-icons/md";
import Form from "../../ui/Form";
import Label from "../../ui/Label";
import { PageInput } from "../../ui/Input";
import InputErrorMsg from "../../ui/ErrorMsgText";
import FormGroup from "../../ui/FormGroup";
import Button from "../../ui/Button";
import UploadPhoto from "../../ui/UploadPhoto";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 18px 20px;
`;

const BtnsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  align-self: flex-end;
`;

function TourUpdateForm({ handlePopup, tourData }) {
  const [isUploading, setIsUploading] = useState(false);
  const { mutate, isPending } = useUpdateTour();

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: tourData?.title || "",
      capacity: tourData?.capacity || "",
      price: tourData?.price || "",
      discount: tourData?.discount || "",
      photo: tourData?.image || "",
    },
  });

  function handleEditTour(data) {
    const editTour = {
      title: data.title,
      capacity: data.capacity,
      price: data.price,
      discount: data.discount,
      image: data.photo,
    };

    mutate({ id: tourData.id, editTour });
    handlePopup();
    reset();
    setIsUploading(true);
  }

  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h3">Edit Tour </Heading>
        <ButtonIcon>
          <MdOutlineCancel onClick={handlePopup} />
        </ButtonIcon>
      </Row>

      <hr
        style={{
          margin: "15px 0",
          border: " .5px solid var(--color-grey-100)",
        }}
      />

      <Form onSubmit={handleSubmit(handleEditTour)}>
        <FormGroup>
          <Label>Tour Title </Label>
          <PageInput
            type="text"
            placeholder="City or spot name"
            inputFor=""
            {...register("title", { required: "This feild is required" })}
          />

          {errors.title && (
            <InputErrorMsg> ⚠ {errors.title.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Capacity</Label>
          <PageInput
            type="number"
            placeholder="Minimum number of person"
            inputFor=""
            {...register("capacity", { required: "This feild is required" })}
          />

          {errors.capacity && (
            <InputErrorMsg> ⚠ {errors.capacity.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Price (USD)</Label>
          <PageInput
            type="number"
            placeholder="0.00"
            inputFor=""
            {...register("price", { required: "This feild is required" })}
          />

          {errors.price && (
            <InputErrorMsg>{errors.price.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Discount (%)</Label>
          <PageInput
            type="number"
            placeholder="0"
            inputFor=""
            {...register("discount", { required: "This feildis required" })}
          />

          {errors.discount && (
            <InputErrorMsg>{errors.discount.message}</InputErrorMsg>
          )}
        </FormGroup>

        <UploadPhoto register={register} errors={errors} setValue={setValue} />

        <BtnsRow>
          <Button
            variation="secondary"
            onClick={handlePopup}
            disabled={isUploading || isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading || isPending}>
            {isPending ? "Appliyng..." : "Apply edit"}
          </Button>
        </BtnsRow>
      </Form>
    </Container>
  );
}

export default TourUpdateForm;

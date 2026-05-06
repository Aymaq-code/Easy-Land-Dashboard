import styled from "styled-components";
import { useCreateTour } from "./useCreateTour";
import { IoCloudUploadOutline } from "react-icons/io5";
import Form from "../../ui/Form";
import { PageInput } from "../../ui/Input";
import Row from "../../ui/Row";
import Label from "../../ui/Label";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import UploadPhoto from "../../ui/UploadPhoto";
import { useForm } from "react-hook-form";
import InputErrorMsg from "../../ui/ErrorMsgText";
import FormGroup from "../../ui/FormGroup";
import ButtonIcon from "../../ui/ButtonIcon";
import { MdOutlineCancel } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
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

function TourCreateForm({ handlePopup }) {
  const [isUploading, setIsUploading] = useState(false);

  const { mutate, isPending } = useCreateTour();
  const newId = uuidv4();

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleCreateTour(data) {
    const newTour = {
      id: newId,
      title: data.title,
      capacity: data.capacity,
      price: data.price,
      discount: data.discount,
      image: data.photo,
    };

    mutate(newTour, {
      onSuccess: () => {
        reset();
      },
    });
    handlePopup();
  }

  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h3">Create New Tour</Heading>
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

      <Form onSubmit={handleSubmit(handleCreateTour)}>
        <FormGroup>
          <Label>Tour Title</Label>
          <PageInput
            type="text"
            placeholder="City or spot name"
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
            {...register("discount", { required: "This feildis required" })}
          />

          {errors.discount && (
            <InputErrorMsg>{errors.discount.message}</InputErrorMsg>
          )}
        </FormGroup>

        <UploadPhoto
          register={register}
          errors={errors}
          setValue={setValue}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />

        <BtnsRow>
          <Button
            variation="secondary"
            onClick={handlePopup}
            disabled={isUploading || isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading || isPending}>
            {isPending ? "Creating..." : "Create tour"}
          </Button>
        </BtnsRow>
      </Form>
    </Container>
  );
}

export default TourCreateForm;

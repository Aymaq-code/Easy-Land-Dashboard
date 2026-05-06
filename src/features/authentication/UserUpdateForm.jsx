import { useEffect, useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Form from "../../ui/Form";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import { PageInput } from "../../ui/Input";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import UploadPhoto from "../../ui/UploadPhoto";
import InputErrorMsg from "../../ui/ErrorMsgText";
import ErrorComponent from "../../ui/ErrorComponent";
import UserNotSelected from "../../ui/UserNotSelected";
import { FaEnvelope, FaUser, FaUserPlus } from "react-icons/fa6";
import { FaLock, FaTimes } from "react-icons/fa";

const FormLayout = styled.section`
  width: 50%;
  height: 500px;

  background: linear-gradient(
    135deg,
    var(--color-grey-0) 0%,
    var(--color-grey-50) 100%
  );
  border: 2px solid var(--color-grey-100);
  border-radius: 2rem;
  box-shadow: var(--shadow-sm);
  padding: 2rem;
  margin: 0 auto;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;

  svg {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-grey-400);
  }

  input {
    padding-left: 4rem !important;
  }
`;

function UserUpdateForm({ user, setSelectedUser }) {
  const { mutate, isPending: isUpdating, error } = useUpdateUser();
  const [isUploading, setIsUploading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { isLoading, errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, reset]);

  function handleEditUser(formData) {
    const editUser = {
      fullName: formData.fullName,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
      photo: formData.photo,
    };

    mutate(
      { id: user.id, editUser },
      {
        onSuccess: (updatedUser) => {
          reset({
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            password: "",
          });
          setIsUploading(false);
          setResetKey((prev) => prev + 1);
          setSelectedUser(null);
        },
      },
    );
  }

  function handleCancelBtn() {
    setSelectedUser(null);
  }

  if (error) return <ErrorComponent />;

  return (
    <FormLayout>
      <Form onSubmit={handleSubmit(handleEditUser)}>
        <FormGroup>
          <Label>Full name</Label>
          <InputWrapper>
            <FaUser />
            <PageInput
              placeholder="Edit full name"
              disabled={isUpdating || isLoading}
              {...register("fullName", {
                required: "User full name required!",
              })}
            />
          </InputWrapper>
          {errors.fullName && (
            <InputErrorMsg>{errors.fullName.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email address</Label>
          <InputWrapper>
            <FaEnvelope />
            <PageInput
              type="email"
              disabled={isUpdating || isLoading}
              {...register("email", {
                required: "User email required!",
              })}
            />
          </InputWrapper>
          {errors.email && (
            <InputErrorMsg>{errors.email.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Password (optional)</Label>
          <InputWrapper>
            <FaLock />
            <PageInput
              type="password"
              placeholder="Leave empty to keep current password"
              disabled={isUpdating || isLoading}
              {...register("password")}
            />
          </InputWrapper>
        </FormGroup>

        <UploadPhoto
          key={resetKey}
          errors={errors}
          register={register}
          setValue={setValue}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />

        <Row type="horizontal" style={{ alignSelf: "end" }} mt="lg">
          <Button
            size="medium"
            variation="secondary"
            disabled={isUpdating || isLoading}
            onClick={handleCancelBtn}>
            <FaTimes />
            Cancel
          </Button>

          <Button
            size="medium"
            type="submit"
            disabled={isUpdating || isUploading}>
            <FaUserPlus />
            {isUpdating ? "Updating..." : "Update user"}
          </Button>
        </Row>
      </Form>
    </FormLayout>
  );
}

export default UserUpdateForm;

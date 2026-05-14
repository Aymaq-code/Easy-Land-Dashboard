// src/features/authentication/UserAccountForm.jsx
import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import { PageInput } from "../../ui/Input";
import Button from "../../ui/Button";
import InputErrorMsg from "../../ui/ErrorMsgText";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";

const FormCard = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    padding: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  margin-top: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

function UserAccountForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
    },
  });

  function onSubmit(data) {
    updateUser(
      { id: user.id, editUser: data },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          setIsEditing(false);
          // Update local storage
          const updatedUser = { ...user, ...data };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          reset(data);
        },
      },
    );
  }

  if (!isEditing) {
    return (
      <FormCard>
        <div style={{ marginBottom: "2rem" }}>
          <p>
            <strong>Full Name:</strong> {user.fullName || "Not set"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </FormCard>
    );
  }

  return (
    <FormCard>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Full Name</Label>
          <PageInput
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="Enter your full name"
            disabled={isPending}
          />
          {errors.fullName && (
            <InputErrorMsg>{errors.fullName.message}</InputErrorMsg>
          )}
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <PageInput
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="your@email.com"
            disabled={isPending}
          />
          {errors.email && (
            <InputErrorMsg>{errors.email.message}</InputErrorMsg>
          )}
        </FormGroup>

        <ButtonGroup>
          <Button
            type="button"
            variation="secondary"
            onClick={() => {
              setIsEditing(false);
              reset();
            }}
            disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </ButtonGroup>
      </Form>
    </FormCard>
  );
}

export default UserAccountForm;

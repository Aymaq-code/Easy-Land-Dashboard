import styled from "styled-components";
import Form from "../ui/Form";
import FormGroup from "../ui/FormGroup";
import { PageInput } from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";
import Row from "../ui/Row";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaTimes,
} from "react-icons/fa";
import Heading from "../ui/Heading";
import UploadPhoto from "../ui/UploadPhoto";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputErrorMsg from "../ui/ErrorMsgText";
import { useCreateUser } from "../features/authentication/useCreateUser";

const UserLayout = styled.section`
  width: 100%;
  max-width: 110rem;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  p {
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  background: linear-gradient(
    135deg,
    var(--color-grey-0) 0%,
    var(--color-grey-50) 100%
  );
  border-radius: 2rem;
  padding: 3rem;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  box-shadow: var(--shadow-md);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  svg {
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-grey-400);
    font-size: 1.6rem;
    pointer-events: none;
    transition: color 0.2s ease;
  }

  input {
    padding-left: 4rem !important;

    &:focus + svg {
      color: var(--color-brand-600);
    }
  }
`;

function Users() {
  const { mutate, isPending } = useCreateUser();
  const [isUploading, setIsUploading] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function handleCreateUser(data) {
    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      photo: data.photo,
    };

    mutate(newUser, {
      onSuccess: () => {
        reset();
        setValue("photo", "");
        setResetKey((prev) => prev + 1);
      },
    });
  }

  return (
    <UserLayout>
      <Header>
        <Heading as="h2">Create a new user</Heading>
        <p>Fill in the details below to add a new team member</p>
      </Header>

      <Container>
        <Form onSubmit={handleSubmit(handleCreateUser)}>
          <FormGroup>
            <Label>Full name</Label>
            <InputWrapper>
              <FaUser />
              <PageInput
                name="fullName"
                placeholder="Enter full name"
                disabled={isPending}
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
                name="email"
                type="email"
                disabled={isPending}
                placeholder="user@example.com"
                {...register("email", {
                  required: "User email required!",
                })}
              />

              {errors.email && (
                <InputErrorMsg>{errors.email.message}</InputErrorMsg>
              )}
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <InputWrapper>
              <FaLock />
              <PageInput
                name="password"
                type="password"
                placeholder="Enter secure password"
                {...register("password", {
                  required: "User password required!",
                })}
                disabled={isPending}
              />
              {errors.password && (
                <InputErrorMsg>{errors.password.message}</InputErrorMsg>
              )}
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <UploadPhoto
              key={resetKey}
              register={register}
              errors={errors}
              setValue={setValue}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              reset="reset"
            />
          </FormGroup>

          <Row type="horizontal" style={{ alignSelf: "end" }} mt="lg" sb="sb">
            <Button
              size="medium"
              variation="secondary"
              disabled={isPending}
              onClick={() => {
                (reset(), setResetKey((prev) => prev + 1));
              }}>
              <FaTimes />
              Cancel
            </Button>
            <Button
              size="medium"
              type="submit"
              disabled={isPending || isUploading}>
              <FaUserPlus />
              {isPending ? "   Creating..." : "   Create new user"}
            </Button>
          </Row>
        </Form>
      </Container>
    </UserLayout>
  );
}

export default Users;

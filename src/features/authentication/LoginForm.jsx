import styled from "styled-components";
import Form from "../../ui/Form";
import FormGroup from "../../ui/FormGroup";
import { LoginInput } from "../../ui/Input";
import Label from "../../ui/Label";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import SocialMedia from "../../ui/SocialMedia";
import { useForm } from "react-hook-form";
import InputErrorMsg from "../../ui/ErrorMsgText";
import { useState } from "react";

import closeEye from "../../assets/images/eye-slash-svgrepo-com.svg";
import openEye from "../../assets/images/eye-svgrepo-com (1).svg";
import FormCheckbox from "../../ui/FormCheckbox";
import { useLogin } from "./useLogin";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  & p {
    font-size: 1.4rem;
  }

  & a:nth-child(2) {
    font-size: 1.4rem;
    color: var(--color-grey-300);
    border-bottom: 1px solid var(--color-grey-400);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(2px);
      border-bottom: 1px solid var(--color-grey-100);
    }
  }
`;

const LoginFooterSocial = styled.ul`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0;
`;

const LoginFooter = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & p {
    font-size: 1.3rem;
    letter-spacing: 1px;
    color: var(--color-grey-300);
  }
`;

const PassEys = styled.img`
  height: 28px;
  cursor: pointer;

  position: absolute;
  right: 0;
`;

function LoginForm() {
  const [seePass, setSeePass] = useState(false);

  function handleSeePass() {
    setSeePass((prv) => !prv);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userEmail: "aymaq@gmail.com",
      userPassword: "1234",
    },
  });

  const { handleLogin } = useLogin(reset);

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Row type="vertical" mt="xlg">
          <LoginInput
            type="email"
            placeholder="Type your email"
            {...register("userEmail", {
              required: "Email address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.userEmail && (
            <InputErrorMsg>{errors.userEmail.message}</InputErrorMsg>
          )}
        </Row>

        <Row type="vertical" mt="md">
          <LoginInput
            type={seePass ? "text" : "password"}
            placeholder="Type your password"
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
          />
          <PassEys
            src={!seePass ? closeEye : openEye}
            alt="toggle password visibility"
            onClick={handleSeePass}
          />

          {errors.userPassword && (
            <InputErrorMsg>{errors.userPassword.message}</InputErrorMsg>
          )}
        </Row>

        <FormCheckbox />

        <Row type="vertical" mt="xlg">
          <Button type="submit" size="large" variation="secondary">
            Login
          </Button>
        </Row>
      </Form>

      <Row type="horizontal" center="center" mt="lg">
        <p>Don't have an account?</p>
        <a>Sign up</a>
      </Row>

      <LoginFooter>
        <p>Or login with</p>
        <SocialMedia />
      </LoginFooter>
    </Container>
  );
}

export default LoginForm;

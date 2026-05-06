import styled from "styled-components";
import Label from "./Label";

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 2rem;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-50);
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledCheckbox = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-grey-50);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  ${HiddenCheckbox}:checked + & {
    background-color: var(--color-grey-50);
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "✓";
    color: var(--color-blue-700);
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const FormForgotPass = styled.a`
  margin-left: auto;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: var(--color-grey-50);
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--color-grey-200);
    transform: translateY(-2px);
  }
`;

function FormCheckbox() {
  return (
    <Checkbox>
      <HiddenCheckbox />
      <StyledCheckbox />
      <p>Remember me</p>
      <FormForgotPass>Forgot Password?</FormForgotPass>
    </Checkbox>
  );
}

export default FormCheckbox;

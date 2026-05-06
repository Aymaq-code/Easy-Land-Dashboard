import styled from "styled-components";

const LoginInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;

  padding: 10px 2px;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-grey-300);
  color: var(--color-grey-50);

  &::placeholder {
    color: var(--color-grey-200);
    letter-spacing: 2px;
    font-size: 1.2rem;
  }

  &:focus {
    border-bottom: 1px solid var(--color-grey-50);
  }
`;

const PageInput = styled.input`
  border: 1px solid var(--color-grey-300);
  width: 100%;
  padding: 9px 10px;
  border-radius: 10px;
  outline: none;

  &:focus {
    border-color: var(--color-indigo-700);
    box-shadow: var(--shadow-focus);
  }

  &::placeholder {
    font-size: 1.3rem;
    letter-spacing: 1px;
    color: var(--color-grey-400);
  }

  &:focus-visible {
    outline: none;
  }
`;

export { LoginInput, PageInput };

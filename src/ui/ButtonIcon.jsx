// src/ui/ButtonIcon.jsx
import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-600);

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-600);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default ButtonIcon;

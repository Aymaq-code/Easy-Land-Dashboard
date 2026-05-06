import styled, { css } from "styled-components";

const sizes = {
  small: css`
    padding: 0.4rem 1rem;
    font-size: clamp(1rem, 1vw, 1.2rem);
    gap: 0.4rem;
  `,
  medium: css`
    padding: 0.9rem 1.6rem;
    font-size: clamp(1.1rem, 1.2vw, 1.3rem);
    gap: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media screen and (max-width: 350px) {
      width: 100%;
    }
  `,
  large: css`
    padding: 0.8rem 2rem;
    font-size: clamp(1.2rem, 1.5vw, 1.6rem);
    gap: 0.8rem;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: white;
    border: none;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-600);
    border: 1px solid var(--color-grey-300);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);
    border: none;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background-color: var(--color-red-800);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  outline: css`
    background-color: transparent;
    color: var(--color-brand-600);
    border: 1px solid var(--color-brand-600);

    &:hover:not(:disabled) {
      background-color: var(--color-brand-50);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--color-brand-600);
    border: none;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-100);
      color: var(--color-brand-700);
    }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 10px;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${(props) => sizes[props.size || "medium"]}
  ${(props) => variations[props.variation || "primary"]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-600);
    outline-offset: 2px;
  }
`;

function Button({
  children,
  size = "medium",
  variation = "primary",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  icon = null,
}) {
  return (
    <StyledButton
      size={size}
      variation={variation}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}>
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </StyledButton>
  );
}

export default Button;

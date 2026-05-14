// src/ui/Logo.jsx
import styled from "styled-components";
import { HiHomeModern } from "react-icons/hi2";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-brand-600);
  text-decoration: none;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-brand-600);
  }
`;

function Logo() {
  return (
    <StyledLogo to="/home">
      <HiHomeModern />
      <span>TravelDash</span>
    </StyledLogo>
  );
}

export default Logo;

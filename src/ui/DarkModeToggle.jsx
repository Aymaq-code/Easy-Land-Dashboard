// src/ui/DarkModeToggle.jsx
import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import styled from "styled-components";

const StyledButton = styled(ButtonIcon)`
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(15deg);
  }
`;

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledButton
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Light mode" : "Dark mode"}>
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </StyledButton>
  );
}

export default DarkModeToggle;

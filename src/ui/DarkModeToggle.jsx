import { FaMoon, FaSun } from "react-icons/fa";
import { CiLight } from "react-icons/ci";
import { useDarkMode } from "../context/DarkModeContext";

import { IoMoonOutline } from "react-icons/io5";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon size="medium" variation="secondart" onClick={toggleDarkMode}>
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;

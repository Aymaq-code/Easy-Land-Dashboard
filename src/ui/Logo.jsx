import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import lightLogo from "../assets/images/logo-light.png";
import darkLogo from "../assets/images/logoDark.png";

const LogoLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  justify-self: left;
`;

const StyledImg = styled.img`
  display: block;
  width: 170px;
  height: 50px;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <LogoLayout>
      <StyledImg src={!isDarkMode ? darkLogo : lightLogo} alt="logo img" />
    </LogoLayout>
  );
}

export default Logo;

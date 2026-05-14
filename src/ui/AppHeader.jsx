// src/ui/AppHeader.jsx
import Logo from "./Logo";
import Row from "./Row";
import Avatar from "./Avatar";
import ButtonIcon from "./ButtonIcon";
import { FaSignOutAlt, FaUser, FaBars } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";
import { logoutUser } from "../features/authentication/useAuth";
import { useGoTo } from "../hooks/useGoTo";
import { Link } from "react-router";
import styled from "styled-components";
import toast from "react-hot-toast";

const AppHeaderLayout = styled.header`
  border-bottom: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  padding: 12px 20px 12px 7px;

  & svg {
    height: 18px;
    width: 18px;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
  }
`;

const MenuButton = styled(ButtonIcon)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    margin-right: 1rem;
  }
`;

const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  @media (min-width: 769px) {
    .mobile-logo {
      display: none;
    }
  }
`;

function AppHeader({ toggleSidebar }) {
  const gotoLogin = useGoTo("/login");

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully!");
    gotoLogin();
  };

  return (
    <AppHeaderLayout>
      <Row type="horizontal">
        <Row type="horizontal" width="full">
          <MobileLogo>
            <MenuButton onClick={toggleSidebar} aria-label="Toggle menu">
              <FaBars />
            </MenuButton>
            <div className="mobile-logo">
              <Logo />
            </div>
          </MobileLogo>
        </Row>
      </Row>
      <Row type="horizontal">
        <Avatar />
        <div>
          <ButtonIcon onClick={handleLogout} aria-label="Logout" title="Logout">
            <FaSignOutAlt />
          </ButtonIcon>
          <Link to="/account" aria-label="Account settings">
            <ButtonIcon as="span" aria-label="Account">
              <FaUser />
            </ButtonIcon>
          </Link>
          <DarkModeToggle />
        </div>
      </Row>
    </AppHeaderLayout>
  );
}

export default AppHeader;

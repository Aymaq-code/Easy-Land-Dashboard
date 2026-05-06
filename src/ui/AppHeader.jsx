// AppHeader.jsx
import UnorderList from "./UnorderList";
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

const AppHeaderLayout = styled.div`
  border-bottom: 1px solid var(--color-grey-300);

  & svg {
    height: 17px;
  }
`;

const MenuButton = styled(ButtonIcon)`
  display: none;
  position: relative;
  left: 0;
  z-index: 10000;

  @media (max-width: 768px) {
    display: flex;
  }
`;

function AppHeader({ toggleSidebar }) {
  const gotoLogin = useGoTo("/login");
  return (
    <AppHeaderLayout>
      <UnorderList type="horizontal" style={{ padding: "8px 30px" }}>
        <Row type="horizontal" width="full">
          <MenuButton onClick={toggleSidebar}>
            <FaBars />
          </MenuButton>
          <Logo />
        </Row>

        <Row type="horizontal">
          <Avatar />
          <ButtonIcon
            onClick={() => {
              logoutUser();
              gotoLogin();
            }}>
            <FaSignOutAlt />
          </ButtonIcon>
          <ButtonIcon>
            <Link to="/account">
              <FaUser />
            </Link>
          </ButtonIcon>

          <DarkModeToggle />
        </Row>
      </UnorderList>
    </AppHeaderLayout>
  );
}

export default AppHeader;

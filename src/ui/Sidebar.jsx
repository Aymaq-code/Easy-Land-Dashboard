import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  Home,
  Calendar,
  Users,
  UserPlus,
  Settings,
  Ticket,
  X,
} from "lucide-react";
import Logo from "./Logo";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-200);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;
  overflow-y: auto;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    height: 100vh;
    z-index: 999;
    transform: translateX(${(props) => (props.$show ? "0" : "-100%")});
    box-shadow: ${(props) => (props.$show ? "var(--shadow-lg)" : "none")};
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 1.6rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  border-radius: var(--border-radius-md);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-brand-600);
  }

  &.active {
    background-color: var(--color-brand-50);
    color: var(--color-brand-700);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-grey-500);

  @media (max-width: 768px) {
    display: block;
  }
`;

function Sidebar({ showSidebar, closeSidebar }) {
  return (
    <StyledSidebar $show={showSidebar}>
      <CloseButton onClick={closeSidebar}>
        <X size={20} />
      </CloseButton>
      <div style={{ padding: "2rem 1.6rem" }}>
        <Logo />
      </div>
      <NavList>
        <li>
          <StyledNavLink to="/home" onClick={closeSidebar}>
            <Home />
            <span>Home</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/bookings" onClick={closeSidebar}>
            <Calendar />
            <span>Bookings</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/tours" onClick={closeSidebar}>
            <Ticket />
            <span>Tours</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/users" onClick={closeSidebar}>
            <UserPlus />
            <span>Create User</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/accounts" onClick={closeSidebar}>
            <Users />
            <span>Accounts</span>
          </StyledNavLink>
        </li>

        <li>
          <StyledNavLink to="/settings" onClick={closeSidebar}>
            <Settings />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledSidebar>
  );
}

export default Sidebar;

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaGlobe,
  FaHome,
  FaRegCalendarAlt,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

const SidebarLayout = styled.aside`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-200);
  padding: 24px 16px;
  height: calc(100vh - 70px);
  position: sticky;
  top: 70px;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 3px;
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    z-index: 999;
    transform: ${({ $showSidebar }) =>
      $showSidebar ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${({ $showSidebar }) =>
      $showSidebar ? "4px 0 20px rgba(0, 0, 0, 0.15)" : "none"};
    padding-top: 80px;
  }

  @media screen and (max-width: 480px) {
    width: 260px;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    background: var(--color-grey-100);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-grey-200);
      transform: rotate(90deg);
    }

    svg {
      font-size: 1.8rem;
      color: var(--color-grey-600);
    }
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: var(--color-grey-700);
  font-size: 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  svg {
    font-size: 1.8rem;
    min-width: 22px;
    color: var(--color-grey-600);
    transition: all 0.2s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      var(--color-grey-100) 0%,
      var(--color-grey-50) 100%
    );
    transform: translateX(4px);

    svg {
      color: var(--color-brand-600);
      transform: scale(1.05);
    }
  }

  &.active {
    background: linear-gradient(
      135deg,
      var(--color-brand-50) 0%,
      var(--color-brand-100) 100%
    );
    color: var(--color-brand-700);
    font-weight: 600;

    svg {
      color: var(--color-brand-600);
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 70%;
      background: var(--color-brand-600);
      border-radius: 0 3px 3px 0;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 14px 16px;

    &:hover {
      transform: translateX(0);
      background: var(--color-grey-100);
    }
  }
`;

const NavLinks = [
  { to: "/home", icon: FaHome, label: "Home" },
  { to: "/tours", icon: FaGlobe, label: "Tours" },
  { to: "/bookings", icon: FaRegCalendarAlt, label: "Bookings" },
  { to: "/users", icon: FaUsers, label: "Users" },
  { to: "/settings", icon: FaCog, label: "Settings" },
];

function Sidebar({ showSidebar, closeSidebar }) {
  return (
    <SidebarLayout $showSidebar={showSidebar}>
      <CloseButton onClick={closeSidebar} aria-label="Close menu">
        <FaTimes />
      </CloseButton>
      <NavList>
        {NavLinks.map(({ to, label }) => (
          <StyledNavLink
            key={to}
            to={to}
            onClick={closeSidebar}
            end={to === "/home"}>
            <span>{label}</span>
          </StyledNavLink>
        ))}
      </NavList>
    </SidebarLayout>
  );
}

export default Sidebar;

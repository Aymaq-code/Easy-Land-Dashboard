import styled from "styled-components";
import UnorderList from "./UnorderList";
import { Link } from "react-router";
import {
  FaCog,
  FaGlobe,
  FaHome,
  FaRegCalendarAlt,
  FaUsers,
} from "react-icons/fa";

const SidebarLayout = styled.div`
  transition: transform 0.3s ease-in-out;
  border-right: 1px solid var(--color-grey-300);

  padding: ${({ $showSidebar }) =>
    $showSidebar ? "140px 0 0 0" : "70px 0 0 0"};

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    z-index: 1000;
    transform: ${({ $showSidebar }) =>
      $showSidebar ? "translateX(0)" : "translateX(-100%)"};
    box-shadow: ${({ $showSidebar }) =>
      $showSidebar ? "2px 0 8px rgba(0,0,0,0.15)" : "none"};
  }

  & a {
    width: 95%;
    color: var(--color-grey-600);
    font-weight: 530;
    font-size: 1.6rem;
    padding: 10px 0 10px 20px;
    border-radius: 7px;
    transition: all 0.3s ease-in;

    display: flex;
    align-items: center;
    gap: 0 1rem;

    @media screen and (max-width: 910px) {
      padding: 8px 0 8px 8px;
    }

    &:hover {
      background-color: var(--color-grey-100);
    }

    &:hover svg {
      fill: var(--color-brand-500);
    }
  }

  & svg {
    color: var(--color-grey-700);
    font-size: 2.1rem;
    transition: fill 0.2s ease-in;
  }
`;

function Sidebar({ showSidebar, closeSidebar }) {
  return (
    <SidebarLayout $showSidebar={showSidebar}>
      <UnorderList type="vertical">
        <Link to="/home" onClick={closeSidebar}>
          <FaHome /> <span>Home</span>
        </Link>
        <Link to="/tours" onClick={closeSidebar}>
          <FaGlobe /> <span>Tours</span>
        </Link>
        <Link to="/bookings" onClick={closeSidebar}>
          <FaRegCalendarAlt /> <span>Bookings</span>
        </Link>
        <Link to="/users" onClick={closeSidebar}>
          <FaUsers /> <span>Users</span>
        </Link>
        <Link to="/settings" onClick={closeSidebar}>
          <FaCog /> <span>Settings</span>
        </Link>
      </UnorderList>
    </SidebarLayout>
  );
}

export default Sidebar;

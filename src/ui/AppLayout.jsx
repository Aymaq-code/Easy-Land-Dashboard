// AppLayout.jsx
import { Outlet } from "react-router";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { useState, useEffect } from "react";

const StyledAppLayout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 260px 1fr;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background-color: var(--color-grey-0);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--color-grey-100);
  padding: 24px;
  min-height: calc(100vh - 70px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 1200px) {
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - 110px);
    height: 100%;
    padding: 0 0 15px 0;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $showSidebar }) => ($showSidebar ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 998;
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const closeSidebar = () => setShowSidebar(false);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledAppLayout>
      <AppHeader toggleSidebar={toggleSidebar} />
      <Overlay $showSidebar={showSidebar} onClick={closeSidebar} />
      <Main>
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

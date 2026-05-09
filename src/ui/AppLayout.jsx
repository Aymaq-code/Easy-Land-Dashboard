// AppLayout.jsx
import { Outlet } from "react-router";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { useState, useEffect } from "react";

const StyledAppLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 260px 1fr;
  flex: 1;
  background-color: var(--color-grey-0);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

const Container = styled.div`
  overflow-x: auto;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--color-grey-100);
  padding: 24px;
  min-height: calc(100vh - 70px);

  @media screen and (max-width: 1200px) {
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    padding: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 12px;
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

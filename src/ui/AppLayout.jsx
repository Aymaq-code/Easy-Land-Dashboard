// AppLayout.jsx
import { Outlet } from "react-router";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { useState } from "react";

const StyledAppLayout = styled.div`
  height: 90vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100%;
  background-color: var(--color-grey-0);

  @media screen and (max-width: 768px) {
    grid-template-columns: ${({ $showSidebar }) =>
      $showSidebar ? "250px 1fr" : "1fr"};
    position: relative;
  }
`;

const Container = styled.div`
  overflow: auto;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: var(--color-grey-100);
  padding: 20px;

  @media screen and (max-width: 1200px) {
    padding: 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
  @media screen and (max-height: 400px) and (orientation: landscape) {
    padding: 0 0 40px 0;
  }
`;

const Overlay = styled.div`
  @media (max-width: 768px) {
    display: ${({ $showSidebar }) => ($showSidebar ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.677);
    z-index: 999;
  }
`;

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <StyledAppLayout>
      <AppHeader toggleSidebar={toggleSidebar} />
      <Overlay $showSidebar={showSidebar} onClick={closeSidebar} />
      <Main $showSidebar={showSidebar}>
        <Sidebar showSidebar={showSidebar} closeSidebar={closeSidebar} />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

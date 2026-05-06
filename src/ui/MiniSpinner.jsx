import React from "react";
import styled from "styled-components";

const Mini = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 50px;
  aspect-ratio: 4;
  --_g: no-repeat
    radial-gradient(circle closest-side, var(--color-blue-700) 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 100%;
  animation: l7 1s infinite linear;

  @keyframes l7 {
    33% {
      background-size:
        calc(100% / 3) 0%,
        calc(100% / 3) 100%,
        calc(100% / 3) 100%;
    }
    50% {
      background-size:
        calc(100% / 3) 100%,
        calc(100% / 3) 0%,
        calc(100% / 3) 100%;
    }
    66% {
      background-size:
        calc(100% / 3) 100%,
        calc(100% / 3) 100%,
        calc(100% / 3) 0%;
    }
  }
`;
function MiniSpinner() {
  return (
    <Mini>
      <Container></Container>
    </Mini>
  );
}

export default MiniSpinner;

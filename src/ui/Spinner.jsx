import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(
        0deg,
        rgb(3 105 161 / 50%) 30%,
        #0000 0 70%,
        rgb(3 105 161 / 100%) 0
      )
      50%/8% 100%,
    linear-gradient(
        90deg,
        rgb(3 105 161 / 25%) 30%,
        #0000 0 70%,
        rgb(3 105 161 / 75%) 0
      )
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);

  &::before,
  &::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
  }

  &::after {
    opacity: 0.83;
    transform: rotate(60deg);
  }

  @keyframes l23 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

function Spinner() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}

export default Spinner;

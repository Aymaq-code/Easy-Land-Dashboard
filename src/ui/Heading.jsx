import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: clamp(2.4rem, 2vw + 1rem, 3.6rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: clamp(2rem, 1.5vw + 1rem, 3rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: clamp(1.4rem, 1vw + 1rem, 1.8rem);
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: clamp(1.2rem, 0.8vw + 1rem, 1rem);
      font-weight: 550;
    `}

  line-height: 1.4;
`;

export default Heading;

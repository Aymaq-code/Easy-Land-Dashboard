import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 0 1rem;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.5rem 0;
    `}

  ${(props) =>
    props.width === "full" &&
    css`
      width: 100%;
    `}

      ${(props) =>
    props.resp === "lg" &&
    css`
      @media screen and (max-width: 1100px) {
        flex-direction: column;
        align-items: start;
        gap: 2rem 0;
      }
    `}

       ${(props) =>
    props.rowRev === "lg" &&
    css`
      @media screen and (max-width: 1100px) {
        flex-direction: column-reverse;
      }
    `}

  ${(props) =>
    props.resp === "sm" &&
    css`
      @media screen and (max-width: 507px) {
        flex-direction: column;
        align-items: start;
        flex-wrap: wrap;
        gap: 1rem 0;
      }
    `}

   

    ${(props) =>
    props.mt === "sm" &&
    css`
      margin-top: 0.5rem;
    `}

    ${(props) =>
    props.mt === "md" &&
    css`
      margin-top: 1rem;
    `}

     ${(props) =>
    props.mt === "lg" &&
    css`
      margin-top: 2rem;
    `}

      ${(props) =>
    props.mt === "xlg" &&
    css`
      margin-top: 4rem;
    `}

       ${(props) =>
    props.mb === "sm" &&
    css`
      margin-bottom: 1rem;
    `}

      ${(props) =>
    props.center === "center" &&
    css`
      justify-content: center;
    `}
     ${(props) =>
    props.sb === "sb" &&
    css`
      justify-content: space-between;

      @media screen and (max-width: 350px) {
        flex-wrap: wrap;
        gap: 1rem;
      }
    `}
`;

export default Row;

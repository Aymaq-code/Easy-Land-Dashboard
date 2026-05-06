// UnorderList.jsx (same as before - no changes needed)
import styled, { css } from "styled-components";

const UnorderList = styled.ul`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: 0 1rem;

      @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 1rem;
        padding: 12px 15px !important;
      }

      @media (max-width: 480px) {
        flex-direction: column;
        gap: 1rem;
      }
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      align-items: center;
      gap: 1.5rem 0;
    `}
`;

export default UnorderList;

import styled from "styled-components";

const StatusTag = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  width: 55%;

  @media screen and (max-width: 1330px) {
    width: 65%;
  }
  @media screen and (max-width: 1100px) {
    width: 80%;
  }
  @media screen and (max-width: 930px) {
    width: 27%;
  }
  @media screen and (max-width: 640px) {
    width: 30%;
  }
  @media screen and (max-width: 435px) {
    width: 35%;
  }
  @media screen and (max-width: 390px) {
    width: 85%;
  }
  @media screen and (max-width: 250px) {
    width: 100%;
  }

  background-color: ${(props) => {
    if (props.status === "checked-in") return "var(--color-green-100)";
    if (props.status === "checked-out") return "var(--color-blue-100)";
    return "var( --color-yellow-100)";
  }};

  color: ${(props) => {
    if (props.status === "checked-in") return "var(--color-green-700)";
    if (props.status === "checked-out") return "var(--color-blue-700)";
    return "var( --color-yellow-700)";
  }};
`;

export default StatusTag;

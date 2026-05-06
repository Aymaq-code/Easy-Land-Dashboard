import styled from "styled-components";
import Row from "./Row";
import Button from "./Button";
import { FaUserPlus } from "react-icons/fa6";
import { useGoTo } from "../hooks/useGoTo";

const Layout = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 6rem auto;
  padding: 5rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
`;

function NoUser() {
  const goToUser = useGoTo("/users");
  return (
    <Layout>
      <Row type="horizontal">
        <p>No user created yet!</p>
        <Button variation="secondary" onClick={() => goToUser()}>
          <FaUserPlus /> Create user
        </Button>
      </Row>
    </Layout>
  );
}

export default NoUser;

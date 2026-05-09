import { useState } from "react";
import styled from "styled-components";
import UserUpdateForm from "../features/authentication/UserUpdateForm";
import UsersList from "../ui/UsersList";
import Heading from "../ui/Heading";
import UserNotSelected from "../ui/UserNotSelected";
import Row from "../ui/Row";
import { useUsers } from "../features/authentication/useUsers";
import NoUser from "../ui/NoUser";
import Spinner from "../ui/Spinner";

const SettingsLayout = styled.main`
  width: 100%;
  max-width: 130rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  margin: 0 auto;
  height: 100%;
  padding: 3rem;

  @media screen and (max-width: 1200px) {
    padding: 3rem;
  }

  @media screen and (max-width: 1100px) {
    padding: 3rem;
    height: auto;
  }

  @media screen and (max-width: 768px) {
    padding: 2.5rem 2rem;
    border-radius: 0;
    height: auto;
  }

  @media screen and (max-width: 507px) {
    padding: 2rem 0.5rem;
  }
`;

const Container = styled.div`
  border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2rem;
  padding: 0 16rem 0 0;

  p {
    color: var(--color-grey-500);
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: start;
    padding: 0;
  }
`;

function Settings() {
  const { data, isLoading } = useUsers();
  const useLength = data?.length;
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading) return <Spinner />;
  if (!useLength) return <NoUser />;

  return (
    <SettingsLayout>
      <Header>
        <Heading as="h2">Settings</Heading>
        <p>Update and manage user data</p>
      </Header>
      <Row type="horizontal" resp="lg" rowRev="lg">
        {useLength && (
          <>
            <UsersList setSelectedUser={setSelectedUser} />

            {selectedUser && (
              <UserUpdateForm
                user={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            )}
          </>
        )}
      </Row>
    </SettingsLayout>
  );
}

export default Settings;

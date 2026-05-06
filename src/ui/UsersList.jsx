import styled from "styled-components";
import { useDeleteUser } from "../features/authentication/useDeleteUser";
import { useUsers } from "../features/authentication/useUsers";
import { FaUser, FaEnvelope, FaKey, FaIdCard } from "react-icons/fa";
import Button from "./Button";
import Row from "./Row";
import Heading from "./Heading";
import Spinner from "./Spinner";
import MiniSpinner from "./MiniSpinner";
import ErrorComponent from "./ErrorComponent";
import InputErrorMsg from "./ErrorMsgText";

const UserListLayout = styled.section`
  border-radius: 2rem;
  overflow-y: auto;
  scrollbar-width: none;
  height: 100%;
  width: 50%;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }

  @media screen and (max-width: 507px) {
    border-radius: 4px;
  }
`;

const Container = styled.div`
  border: 2px solid var(--color-grey-100);
  overflow-y: scroll;
  scrollbar-width: none;
  height: 500px;
  background: linear-gradient(
    135deg,
    var(--color-grey-0) 0%,
    var(--color-grey-50) 100%
  );
  border-radius: 2rem;
  padding: 2rem;
  margin: 0 auto;
  box-shadow: var(--shadow-sm);

  & P {
    font-size: 1.3rem;
  }

  .count {
    font-weight: 550;
    font-size: 1.4rem;
    color: var(--color-indigo-700);
  }

  @media screen and (max-width: 507px) {
    border-radius: 4px;
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-grey-200);

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-grey-800);
    margin: 0 0 0.5rem 0;
  }

  p {
    color: var(--color-grey-600);
    font-size: 1.4rem;
    margin: 0;
  }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  max-height: calc(100% - 80px);
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: 10px;

    &:hover {
      background: var(--color-grey-500);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media screen and (max-width: 507px) {
    padding: 0;
  }
`;

const UserCard = styled.div`
  background: var(--color-grey-0);
  border-radius: 1.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-grey-300);
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }

  svg {
    flex-shrink: 0;
    color: var(--color-brand-600);
    font-size: 1.6rem;
  }

  .label {
    font-weight: 600;
    color: var(--color-grey-700);
    min-width: 90px;
  }

  .value {
    color: var(--color-grey-600);
    word-break: break-all;
    flex: 1;
  }
`;

const Badge = styled.div`
  display: inline-block;
  background: ${(props) =>
    props.variant === "id"
      ? "var(--color-brand-100)"
      : "var(--color-grey-100)"};
  color: ${(props) =>
    props.variant === "id"
      ? "var(--color-brand-700)"
      : "var(--color-grey-700)"};
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-family: monospace;
  font-weight: 500;
`;

function UsersList({ setSelectedUser }) {
  const { data, isLoading, error } = useUsers();
  const { mutate: delteUser } = useDeleteUser();

  if (isLoading) return <MiniSpinner />;
  if (error) return <ErrorComponent />;

  return (
    <UserListLayout>
      <Container>
        <Row type="vertical">
          <Heading as="h3">👥 User Management</Heading>
          <p>View and manage all registered users</p>
          <Row type="horizontal" mb="sm">
            <p>Total Users</p>
            <span className="count">{data.length} users</span>
          </Row>
        </Row>

        <UsersGrid>
          {data.map((user, index) => (
            <UserCard key={user.id || index}>
              <Row type="vertical">
                <InfoRow>
                  <FaIdCard />
                  <span className="label">User ID:</span>
                  <span className="value">
                    <Badge variant="id">{user.id}</Badge>
                  </span>
                </InfoRow>

                <InfoRow>
                  <FaUser />
                  <span className="label">Name:</span>
                  <span className="value">{user.fullName || user.name}</span>
                </InfoRow>

                <InfoRow>
                  <FaEnvelope />
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </InfoRow>

                <InfoRow>
                  <FaKey />
                  <span className="label">Password:</span>
                  <span className="value">
                    <Badge>{user.password}</Badge>
                  </span>
                </InfoRow>

                <InfoRow>
                  <Button
                    size="small"
                    variation="danger"
                    onClick={() => delteUser(user.id)}>
                    🗑️ Delete
                  </Button>
                  <Button
                    size="small"
                    variation="outline"
                    onClick={() => setSelectedUser(user)}>
                    📝 Edit
                  </Button>
                </InfoRow>
              </Row>
            </UserCard>
          ))}
        </UsersGrid>
      </Container>
    </UserListLayout>
  );
}

export default UsersList;

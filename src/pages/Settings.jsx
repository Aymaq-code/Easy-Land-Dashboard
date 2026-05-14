import styled from "styled-components";
import { getCurrentUser } from "../features/authentication/useAuth";
import UserAccountForm from "../features/authentication/UserAccountForm";
import Heading from "../ui/Heading";

const AccountContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-700)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 600;
  color: white;
`;

const UserInfo = styled.div`
  flex: 1;
`;

function Settings() {
  const user = getCurrentUser();

  if (!user) {
    return (
      <AccountContainer>
        <Heading as="h2">Account Settings</Heading>
        <p>Please log in to view your account.</p>
      </AccountContainer>
    );
  }

  return (
    <AccountContainer>
      <ProfileHeader>
        <Avatar>{user.fullName?.charAt(0) || user.email?.charAt(0)}</Avatar>
        <UserInfo>
          <Heading as="h2">Welcome back, {user.fullName || "User"}!</Heading>
          <p style={{ color: "var(--color-grey-500)", marginTop: "0.5rem" }}>
            Manage your profile information and preferences
          </p>
        </UserInfo>
      </ProfileHeader>

      <UserAccountForm user={user} />
    </AccountContainer>
  );
}

export default Settings;

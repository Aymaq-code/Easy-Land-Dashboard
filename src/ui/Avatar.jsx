import styled from "styled-components";
import noImage from "../assets/images/no-img.jpg";
import { getCurrentUser } from "../features/authentication/useAuth";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 150px;
  max-width: 280px;
  width: auto;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  @media (max-width: 768px) {
    gap: 0.8rem;
    min-width: 120px;
    padding: 0.2rem 0.6rem;
  }

  @media (max-width: 640px) {
    min-width: auto;
    gap: 0.5rem;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--color-brand-100);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 640px) {
    width: 32px;
    height: 32px;
  }
`;

const AvatarName = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const GuestName = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  font-style: italic;
`;

function Avatar() {
  const currentUser = getCurrentUser();

  return (
    <Container>
      <AvatarImg src={currentUser?.photo || noImage} alt="avatar img" />
      <AvatarName title={currentUser?.fullName || "Guest"}>
        {currentUser?.fullName || "Guest"}
      </AvatarName>
    </Container>
  );
}

export default Avatar;

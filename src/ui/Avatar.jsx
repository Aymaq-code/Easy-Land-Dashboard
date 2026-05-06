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

  @media (max-width: 768px) {
    gap: 0.8rem;
    min-width: 120px;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    min-width: 100px;
  }
`;

const AvatarImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const AvatarName = styled.p`
  font-size: clamp(0.9rem, 2.5vw, 1.3rem);
  font-weight: 500;
  color: var(--color-grey-700);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    font-weight: 500;
  }
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

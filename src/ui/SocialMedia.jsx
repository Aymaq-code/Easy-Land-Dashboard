import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import styled from "styled-components";

const LoginFooterSocial = styled.ul`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0;
`;

const SocialItem = styled.li`
  list-style: none;
  background-color: var(--color-grey-100);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-blue-700);
  font-size: 18px;
  cursor: pointer;
`;

function SocialMedia() {
  return (
    <LoginFooterSocial>
      <SocialItem>
        <SocialLink>
          <FaFacebookF />
        </SocialLink>
      </SocialItem>

      <SocialItem>
        <SocialLink href="#">
          <FaGoogle />
        </SocialLink>
      </SocialItem>

      <SocialItem>
        <SocialLink href="#">
          <FaApple />
        </SocialLink>
      </SocialItem>
    </LoginFooterSocial>
  );
}

export default SocialMedia;

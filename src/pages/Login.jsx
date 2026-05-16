import styled from "styled-components";
import loginImg from "../assets/images/loginPageImg.svg";
import Logo from "../ui/Logo";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  height: 100vh;
  padding: 0 130px;
  align-content: center;

  @media screen and (max-width: 1200px) {
    padding: 0 70px;
  }

  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

const LoginContent = styled.div`
  height: 90%;
  border-radius: 50px;
  box-shadow: var(--shadow-md);

  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    height: 100%;
    border-radius: 0;
    margin: 0;
  }
`;

const LoginSide = styled.section`
  width: 50%;
  height: 100%;
  background-color: var(--color-blue-700);
  color: var(--color-grey-50);
  padding: 0 40px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (max-width: 900px) {
    padding: 20px 30px 60px;
    width: 100%;
  }

  @media screen and (max-width: 436px) {
    padding: 15px 15px 50px;
  }

  @media screen and (max-width: 320px) {
    padding: 15px 10px 40px;
  }
  @media screen and (max-width: 320px) {
    padding: 15px 10px 40px;
    height: 100vh;
  }
`;

const LoginImg = styled.section`
  width: 50%;
  height: 100%;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
`;

function Login() {
  return (
    <LoginLayout>
      <LoginContent>
        <LoginSide>
          <br />
          <Logo />
          <Row type="vertical" mt="xlg">
            <Heading as="h1" variant="h1">
              Welcome Back
            </Heading>
            <Paragraph>Login to access your account</Paragraph>
          </Row>
          <LoginForm />
        </LoginSide>
        <LoginImg>
          <StyledImg src={loginImg} alt="login image" />
        </LoginImg>
      </LoginContent>
    </LoginLayout>
  );
}

export default Login;

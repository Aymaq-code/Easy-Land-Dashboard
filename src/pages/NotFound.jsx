import styled from "styled-components";
import notFoundImg from "../assets/images/404img.gif";
import Button from "../ui/Button";
import { useGoTo } from "../hooks/useGoTo";

const ErrorLayout = styled.main`
  height: 100vh;
`;

const Contents = styled.div`
  max-width: 60rem;
  margin: 2rem auto 0 auto;
  padding: 40px;
`;

const MsgAndBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem 0;
`;

const Msg = styled.h3``;

const Image = styled.img`
  width: 100%;
  height: 450px;
`;

function NotFound() {
  const goToHome = useGoTo("/home");

  return (
    <ErrorLayout>
      <Contents>
        <MsgAndBtn>
          <Msg>Sorry, page not found!</Msg>
          <Button size="medium" variation="primary" onClick={() => goToHome()}>
            Go to Home Page
          </Button>
        </MsgAndBtn>
        <Image src={notFoundImg} />
      </Contents>
    </ErrorLayout>
  );
}

export default NotFound;

import styled from "styled-components";

const Layout = styled.div`
  padding: 0 170px 0 0;
  & p {
    font-size: 1.4rem;
  }
  /* 
  @media screen and (max-width: 1100px) {
    padding: 0 0 0 170px;
  } */
`;

function UserNotSelected() {
  return (
    <Layout>
      <p>No user selected for edit!</p>
    </Layout>
  );
}

export default UserNotSelected;

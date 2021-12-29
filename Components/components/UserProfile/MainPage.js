import { Row, Col, Container } from "react-bootstrap";
import { useContext } from "react";
import { Context as UserContext } from "../../../Context/User";
import { Context } from "../../../Context/Context";
import styles from "../../../styles/UserProfile/MainPage.module.css";
import User from "./User";
import ModMainPage from "./ModMainPage";
import UserMainPage from "./UserMainPage";

const MainPage = () => {
  const { books } = useContext(Context).state;
  const { user } = useContext(UserContext).state;
  return (
    <Container fluid className={styles.mainBox}>
      <Row className="justify-content-center">
        <User></User>
      </Row>
      {user && user.userRole === 1 ? (
        <ModMainPage books={books} user={user}></ModMainPage>
      ) : (
        <UserMainPage books={books}></UserMainPage>
      )}
    </Container>
  );
};
export default MainPage;

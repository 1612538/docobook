import { Row, Col, Container } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../Context/Context";
import { Context as UserContext } from "../../../Context/User";
import BookCard from "../BookCards/BookCard";
import styles from "../../../styles/UserProfile/MainPage.module.css";
import Title from "../Title/Title";
import User from "./User";

const MainPage = () => {
  const { books } = useContext(Context).state;
  const { user } = useContext(UserContext).state;
  return (
    <Container fluid className={styles.mainBox}>
      <Row className="justify-content-center">
        <User></User>
      </Row>
      {user && user.userRole === 1 ? (
        <>
          <Row>
            <Col xs={12} md={12} lg={9} className="pt-5">
              <Title name1="Truyện" name2="đã đăng"></Title>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={9}>
              <Row className="justify-content-center align-items-center">
                {books && books.length > 0 ? (
                  books.map((item, key) => (
                    <Col xs={6} md={3} lg={2} key={key}>
                      <BookCard Book={item}></BookCard>
                    </Col>
                  ))
                ) : (
                  <Row
                    className="m-0 justify-content-center align-items-center"
                    style={{ height: 100 }}
                  >
                    <div className="spinner-border" role="status"></div>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col xs={12} md={12} lg={9} className="pt-5">
              <Title name1="Danh sách" name2="yêu thích"></Title>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={9}>
              <Row className="justify-content-center align-items-center">
                {books && books.length > 0 ? (
                  books.map((item, key) => (
                    <Col xs={6} md={3} lg={2} key={key}>
                      <BookCard Book={item}></BookCard>
                    </Col>
                  ))
                ) : (
                  <Row
                    className="m-0 justify-content-center align-items-center"
                    style={{ height: 100 }}
                  >
                    <div className="spinner-border" role="status"></div>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={9} className="pt-5">
              <Title name1="Chương" name2="đánh dấu"></Title>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} lg={9}>
              <Row className="justify-content-center align-items-center">
                {books && books.length > 0 ? (
                  books.map((item, key) => (
                    <Col xs={6} md={3} lg={2} key={key}>
                      <BookCard Book={item}></BookCard>
                    </Col>
                  ))
                ) : (
                  <Row
                    className="m-0 justify-content-center align-items-center"
                    style={{ height: 100 }}
                  >
                    <div className="spinner-border" role="status"></div>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
export default MainPage;

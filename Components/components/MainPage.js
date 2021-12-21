import { useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/mainPage.module.css";
import { Context } from "../../Context/Context";
import BookCards from "./BookCards/BookCard";
import ChapterCards from "./BookCards/ChapterCard";
import Title from "./Title/Title";
import Discuss from "./Utils/Discuss";

const MainPage = () => {
  const books = useContext(Context).state.books;
  const booksMostView = useContext(Context).state.booksByViews;
  const chapters = useContext(Context).state.chapters;
  return (
    <Container fluid className={styles.mainBox + " py-5 px-3"}>
      <Row>
        <Col xs={12}>
          <h5 className="pb-2">
            <b className="ms-3 bg-dark text-white rounded px-3 py-2">
              Truyện nổi bật
            </b>
          </h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={9}>
          <Row className="justify-content-center align-items-center">
            {booksMostView && booksMostView.length > 0 ? (
              booksMostView.map((item, key) => (
                <Col xs={6} md={3} lg={2} key={key}>
                  <BookCards Book={item}></BookCards>
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
          <Title name1="Danh sách" name2="mới nhất"></Title>
        </Col>
        <Col xs={0} md={0} lg={3} className={styles.discussionTitle + " pt-5"}>
          <Title name1="Thảo" name2="luận"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {books && books.length > 0 ? (
              books.map((item, key) => (
                <Col xs={6} md={3} lg={2} key={key}>
                  <BookCards Book={item}></BookCards>
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
        <Col xs={0} lg={3}>
          <Discuss></Discuss>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Chương" name2="mới nhất"></Title>
        </Col>
        <Col xs={0} md={0} lg={3} className={styles.discussionTitle + " pt-5"}>
          <Title name1="Bình luận" name2="mới"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {chapters && chapters.length > 0 ? (
              chapters.map((item, key) => (
                <Col xs={6} md={3} lg={2} key={key}>
                  <ChapterCards Chapter={item}></ChapterCards>
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
        <Col xs={0} lg={3}>
          <Discuss></Discuss>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;

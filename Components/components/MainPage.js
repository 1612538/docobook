import { useState, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/mainPage.module.css";
import { Context } from "../../Context/Context";
import BookCards from "./BookCards/BookCard";
import ChapterCards from "./BookCards/ChapterCard";
import Title from "./Title/Title";

const MainPage = () => {
  const books = useContext(Context).state.books;
  const chapters = useContext(Context).state.chapters;
  return (
    <Container fluid className={styles.mainBox + " py-5 px-3"}>
      <Row>
        <Col>
          <Title name1="Danh sách" name2="mới nhất"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center">
            {books.map((item, key) => (
              <Col xs={6} md={3} lg={2} key={key}>
                <BookCards Book={item}></BookCards>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="pt-5">
          <Title name1="Chương" name2="mới nhất"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center">
            {chapters.map((item, key) => (
              <Col xs={6} md={3} lg={2} key={key}>
                <ChapterCards Chapter={item}></ChapterCards>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;

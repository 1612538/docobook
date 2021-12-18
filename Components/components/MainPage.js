import { useState, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/mainPage.module.css";
import { Context } from "../../Context/Context";
import BookCards from "./BookCards/BookCard";

const MainPage = () => {
  const books = useContext(Context).state.books;
  return (
    <Container fluid className={styles.mainBox + " py-5 px-3"}>
      <Row>
        <Col>
          <h3 className="pb-3">
            <b className="ms-3 bg-dark text-white rounded px-3 py-2">
              Danh sách
            </b>
            <div
              className="ms-1 px-3 pb-1 pt-2 border-bottom border-2 border-dark"
              style={{ display: "inline-block", textTransform: "uppercase" }}
            >
              mới nhất
            </div>
          </h3>
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
    </Container>
  );
};

export default MainPage;

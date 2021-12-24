import { Container, Col, Row } from "react-bootstrap";
import styles from "../../../styles/BookInfos/mainPage.module.css";
import BookDetail from "./BookDetail";
import Chapters from "./Chapters";
import Uploader from "./Uploader";
import Comment from "./Comment";

const MainPage = () => {
  return (
    <Container fluid className={styles.mainContainer}>
      <Container fluid className={styles.myContainer}>
        <Row className="justify-content-center">
          <Col lg={8} md={12}>
            <BookDetail></BookDetail>
          </Col>
          <Col lg={3} md={12}>
            <Uploader></Uploader>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} md={12}>
            <Chapters></Chapters>
          </Col>
          <Col lg={3} md={12}></Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8} md={12}>
            <Comment></Comment>
          </Col>
          <Col lg={3} md={12}></Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MainPage;

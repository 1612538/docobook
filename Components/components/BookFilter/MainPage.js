import { Container, Row, Col } from "react-bootstrap";
import Title from "../Title/Title";
import BookCard from "../BookCards/BookCard";
import Discuss from "../Utils/Discuss";
import { Context } from "../../../Context/Context";
import { useContext } from "react";
import styles from "../../../styles/mainPage.module.css";

const MainPage = ({ category }) => {
  const { books } = useContext(Context).state;
  return (
    <Container fluid className={styles.mainBox + " py-5 px-3"}>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Danh mục" name2={category.name}></Title>
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
        <Col xs={0} lg={3}>
          <Discuss></Discuss>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;

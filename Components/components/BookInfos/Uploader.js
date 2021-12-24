import styles from "../../../styles/BookInfos/uploader.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";

const Uploader = () => {
  const { book } = useContext(Context).state;
  return (
    <Container fluid className={styles.myContainer}>
      {book ? (
        <Row>
          <Row className={styles.Header}>Người đăng</Row>
          <Container fluid className={styles.userSection}>
            <Row className="justify-content-center p-3">
              <Row className={styles.avatar}></Row>
            </Row>
            <Row className="justify-content-center align-items-end pt-3">
              <Row className="justify-content-center">
                {book.uploader.fullname}
              </Row>
              <Row className="justify-content-center pt-3">
                <Row className="justify-content-center pt-3">
                  <Col xs={6} sm={5}>
                    <Row className="justify-content-center">
                      <Row
                        className={styles.cssHeart + " justify-content-center"}
                      >
                        <i class="bi bi-heart"></i>
                      </Row>
                      <Row className="justify-content-center w-100">
                        Yêu thích
                      </Row>
                    </Row>
                  </Col>
                  <Col xs={6} sm={5}>
                    <Row className="justify-content-center">
                      <Row
                        className={styles.cssStar + " justify-content-center"}
                      >
                        <i class="bi bi-star"></i>
                      </Row>
                      <Row className="justify-content-center w-100">
                        Theo dõi
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Container>
        </Row>
      ) : undefined}
    </Container>
  );
};
export default Uploader;

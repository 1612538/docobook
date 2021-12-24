import { useContext, useEffect } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/BookInfos/bookDetail.module.css";

const BookDetail = () => {
  const { book } = useContext(Context).state;
  return (
    <Container fluid className={styles.myContainer}>
      {book ? (
        <Row>
          <Row
            className="justify-content-center align-items-center"
            style={{ padding: 0, margin: 0 }}
          >
            <Col
              xs="auto"
              md={4}
              lg={4}
              className="justify-content-center d-flex"
            >
              <div
                style={{
                  backgroundImage: `url("http://localhost:1337${
                    book.image.url ? book.image.url : undefined
                  }")`,
                }}
                className={styles.imgCustom}
              ></div>
            </Col>
            <Col xs={12} md={8} lg={8}>
              <Row
                className="align-items-start"
                style={{
                  minHeight: 300,
                }}
              >
                <Row>
                  <Row className={styles.title}>{book.name}</Row>
                  <Row className="mt-2">
                    <Row className="align-items-center">
                      <Col xs="auto">Quốc gia: </Col>
                      <Col
                        xs="auto"
                        className={styles.category}
                        style={{ fontWeight: "bold" }}
                      >
                        {book.country.name}
                      </Col>
                    </Row>
                    <Row className="align-items-center mt-2">
                      <Col xs="auto">Thể loại:</Col>
                      {book.categories.map((item, key) => (
                        <Col xs="auto" key={key} className={styles.category}>
                          {item.name}
                        </Col>
                      ))}
                    </Row>
                  </Row>
                </Row>
                <Row
                  style={{
                    cursor: "default",
                    width: "100%",
                    alignSelf: "flex-end",
                  }}
                >
                  <Row>
                    <Col xs={6} sm={3}>
                      <Row className="justify-content-center">
                        <Row
                          className={
                            styles.cssHeart + " justify-content-center"
                          }
                        >
                          <i class="bi bi-heart"></i>
                        </Row>
                        <Row className="justify-content-center w-100">
                          Yêu thích
                        </Row>
                      </Row>
                    </Col>
                    <Col xs={6} sm={3}>
                      <Row className="justify-content-center">
                        <Row
                          className={styles.cssStar + " justify-content-center"}
                        >
                          <i class="bi bi-star"></i>
                        </Row>
                        <Row className="justify-content-center w-100">
                          Đánh giá
                        </Row>
                      </Row>
                    </Col>
                    <Col xs={6} sm={3}>
                      <Row className="justify-content-center">
                        <Row
                          className={styles.cssList + " justify-content-center"}
                        >
                          <i class="bi bi-list-ul"></i>
                        </Row>
                        <Row className="justify-content-center w-100">
                          Mục lục
                        </Row>
                      </Row>
                    </Col>
                    <Col xs={6} sm={3}>
                      <Row className="justify-content-center">
                        <Row
                          className={
                            styles.cssComment + " justify-content-center"
                          }
                        >
                          <i class="bi bi-chat"></i>
                        </Row>
                        <Row className="justify-content-center w-100">
                          Bình luận
                        </Row>
                      </Row>
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Col>
          </Row>
          <Row
            className={
              styles.secondRow + " justify-content-center align-items-center"
            }
          >
            <Col xs={12} sm={3}>
              <Row className="justify-content-center">
                <Row className=" justify-content-center">Cập nhật cuối</Row>
                <Row className="justify-content-center w-100">
                  {book.updated_at.slice(0, 10)}
                </Row>
              </Row>
            </Col>
            <Col xs={4} sm={3}>
              <Row className="justify-content-center">
                <Row className=" justify-content-center">Đánh giá</Row>
                <Row className="justify-content-center w-100">
                  {book.rate ? book.rate : 0}
                </Row>
              </Row>
            </Col>
            <Col xs={4} sm={3}>
              <Row className="justify-content-center">
                <Row className=" justify-content-center">Lượt xem</Row>
                <Row className="justify-content-center w-100">{book.views}</Row>
              </Row>
            </Col>
            <Col xs={4} sm={3}>
              <Row className="justify-content-center">
                <Row className="justify-content-center">Lượt thích</Row>
                <Row className="justify-content-center w-100">
                  {book.likes ? books.likes : 0}
                </Row>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2 justify-content-center align-items-center">
            <h5>Tóm tắt</h5>
            <div className={styles.text}>{book.description}</div>
          </Row>
        </Row>
      ) : undefined}
    </Container>
  );
};
export default BookDetail;

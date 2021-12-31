import { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/BookInfos/bookDetail.module.css";
import Link from "next/link";
import { getOne, deleteOne, AddFavorite } from "../../../Services/Favorite";

const BookDetail = () => {
  const [isFavor, setFavor] = useState(false);
  const { book } = useContext(Context).state;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkData = async () => {
      setLoading(true);
      const id = JSON.parse(localStorage.getItem("user")).id;
      const res = await getOne(id, book.id);
      if (res) setFavor(res.id);
      else setFavor(false);
      setLoading(false);
    };
    if (localStorage.getItem("user") && book) {
      checkData();
    }
  }, [book]);

  const handleClick = async () => {
    setLoading(true);
    if (isFavor) {
      const res = await deleteOne(isFavor);
    } else {
      const data = {
        bookinfo: book,
        user: JSON.parse(localStorage.getItem("user")),
      };
      const res = await AddFavorite(data);
    }
    setFavor(!isFavor);
    setLoading(false);
  };

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
                      <Link href={"/Countries/" + book.country.id}>
                        <Col
                          xs="auto"
                          className={styles.category}
                          style={{ fontWeight: "bold" }}
                        >
                          {book.country.name}
                        </Col>
                      </Link>
                    </Row>
                    <Row className="align-items-center mt-2">
                      <Col xs="auto">Thể loại:</Col>
                      {book.categories.map((item, key) => (
                        <Link href={"/Categories/" + item.id} key={key}>
                          <Col xs="auto" className={styles.category}>
                            {item.name}
                          </Col>
                        </Link>
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
                        {loading ? (
                          <div
                            className="spinner-border mt-2"
                            role="status"
                          ></div>
                        ) : (
                          <>
                            <Row
                              className={
                                styles.cssHeart + " justify-content-center"
                              }
                              onClick={handleClick}
                            >
                              {isFavor ? (
                                <i className="bi bi-heart-fill"></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </Row>
                            <Row className="justify-content-center w-100">
                              Yêu thích
                            </Row>
                          </>
                        )}
                      </Row>
                    </Col>
                    <Col xs={6} sm={3}>
                      <Row className="justify-content-center">
                        <Row
                          className={styles.cssStar + " justify-content-center"}
                        >
                          <i className="bi bi-star"></i>
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
                          <i className="bi bi-list-ul"></i>
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
                          <i className="bi bi-chat"></i>
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
                  {book.likes ? book.likes : 0}
                </Row>
              </Row>
            </Col>
          </Row>
          <Row className="mt-2 justify-content-center align-items-center">
            <h5 className="ms-5">Tóm tắt</h5>
            <div className={styles.text}>{book.description}</div>
          </Row>
        </Row>
      ) : undefined}
    </Container>
  );
};
export default BookDetail;

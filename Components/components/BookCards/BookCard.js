import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/card.module.css";
import { Container, Col, Row, Fade } from "react-bootstrap";

const BookCard = ({ Book }) => {
  const [show, setShow] = useState(false);
  const [isLeft, setLeft] = useState(false);
  const myRef = useRef(null);
  useEffect(() => {
    const updateWindowDimensions = () => {
      if (myRef.current.getBoundingClientRect().right + 352 > window.innerWidth)
        setLeft(true);
      else setLeft(false);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  return (
    <Container ref={myRef} className={styles.noPadding + " my-2"}>
      <Col
        xs={12}
        onMouseOver={() => {
          if (window.innerWidth > 576) setShow(true);
        }}
        onMouseOut={() => {
          setShow(false);
        }}
      >
        <Row style={{ margin: 0 }}>
          <div
            style={{
              backgroundImage: `url("http://localhost:1337${Book.image.url}")`,
            }}
            className={styles.imgCustom}
          ></div>
        </Row>
        <Row className={styles.title}>{Book.name}</Row>
      </Col>
      <Fade in={show} unmountOnExit>
        <div className={isLeft ? styles.menu_left : styles.menu}>
          <Container fluid className={styles.myContainer}>
            <Row className={styles.sub_title}>{Book.name}</Row>
            <Row className={styles.content}>
              <Row>
                <Col xs="auto">Quốc gia: </Col>
                <Col
                  xs="auto"
                  className={styles.category}
                  style={{ fontWeight: "bold" }}
                >
                  {Book.country.name}
                </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col xs="auto">Thể loại:</Col>
                {Book.categories.map((item, key) => (
                  <Col xs="auto" key={key} className={styles.category}>
                    {item.name}
                  </Col>
                ))}
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col xs="auto">Người đăng: {Book.uploader.fullname}</Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col xs="auto">Lượt xem: {Book.views}</Col>
              </Row>
            </Row>
          </Container>
        </div>
      </Fade>
    </Container>
  );
};

export default BookCard;

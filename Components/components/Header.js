import { useEffect, useState } from "react";
import styles from "../../styles/header.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Header() {
  const [list, setList] = useState([
    "Trang chủ",
    "Thể loại",
    "Giới thiệu",
    "Thông tin liên hệ",
  ]);

  const [space, setSpace] = useState({ top: 0 });

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let value = window.scrollY;
      if (value <= 125) setSpace({ top: 0 - value });
      else if (space.top < 125) setSpace({ top: -125 });
    });
  }, []);
  return (
    <Container fluid style={{ padding: 0 }}>
      <Container fluid className={styles.background}>
        <img
          src={"/static/header1.jpg"}
          className={styles.myImage}
          style={space}
        />
        <Row
          className="justify-content-md-left"
          style={{ zIndex: 2, position: "relative", margin: "0 2rem" }}
        >
          {list.map((item, key) => (
            <Col sm={5} md="auto" key={key}>
              <Button
                className={
                  key === 0
                    ? `${styles.navItem} ${styles.navItemActive} shadow-none`
                    : `${styles.navItem} shadow-none`
                }
                href="#"
              >
                {item}
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
      <Container fluid className={styles.SearchBarContainer}>
        <Row className=" justify-content-sm-center justify-content-md-start">
          <Col sm="auto" md={3}>
            <Row className=" justify-content-center justify-content-md-start align-content-center">
              <Col xs={2} sm="auto" md="auto">
                <img src="/static/icon.png" className={styles.image}></img>
              </Col>
              <Col xs={5} sm="auto" md={8} className={styles.title}>
                DocoBook
              </Col>
            </Row>
          </Col>
          <Col sm={8} md={6}>
            <Container fluid className={styles.searchBar}>
              <Row>
                <Col xs={1} sm="auto" md="auto">
                  <i className={"bi bi-search "}></i>
                </Col>
                <Col xs={10} sm={10} md={10}>
                  <input
                    placeholder="Tìm kiếm..."
                    className={styles.search}
                  ></input>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

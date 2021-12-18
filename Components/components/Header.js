import { useEffect, useState, useContext } from "react";
import styles from "../../styles/header.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Context } from "../../Context/Context";

const Header = () => {
  const [space, setSpace] = useState({ top: 0 });
  const categories = useContext(Context).state.categories;
  const countries = useContext(Context).state.countries;
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [show2, setShow2] = useState(false);
  const [active2, setActive2] = useState(false);
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
          <Col sm={5} md="auto">
            <Button
              className={`${styles.navItem} ${styles.navItemActive} shadow-none`}
              href="#"
            >
              Trang chủ
            </Button>
          </Col>
          <Col sm={5} md="auto">
            <div
              className={styles.dropdown}
              onMouseEnter={() => {
                setShow(true);
                setActive(true);
              }}
              onMouseLeave={() => {
                setShow(false);
                setActive(false);
              }}
            >
              <Button
                className={`${styles.navItem} ${
                  active ? styles.navItemActive : ""
                } shadow-none`}
                style={{ marginTop: "0rem", marginRight: "0rem" }}
                onClick={() => {
                  setShow(true);
                  setActive(true);
                }}
              >
                Thể loại
              </Button>
              <div
                className={styles.menu}
                style={show ? { display: "block" } : { display: "none" }}
              >
                <Container fluid>
                  <Row xs={12} md={11}>
                    {categories
                      ? categories.map((item, key1) => (
                          <Col xs={12} md="auto" key={key1}>
                            {item.map((item2, key2) => (
                              <Row
                                xs={12}
                                className="justify-content-center"
                                key={key2}
                              >
                                <div
                                  className={styles.menuItem}
                                  href="#"
                                  className={styles.menuItem}
                                >
                                  {item2.name}
                                </div>
                              </Row>
                            ))}
                          </Col>
                        ))
                      : undefined}
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
          <Col sm={5} md="auto">
            <div
              className={styles.dropdown}
              onMouseEnter={() => {
                setShow2(true);
                setActive2(true);
              }}
              onMouseLeave={() => {
                setShow2(false);
                setActive2(false);
              }}
            >
              <Button
                className={`${styles.navItem} ${
                  active2 ? styles.navItemActive : ""
                } shadow-none`}
                style={{ marginTop: "0rem", marginRight: "0rem" }}
                onClick={() => {
                  setShow2(true);
                  setActive2(true);
                }}
              >
                Quốc gia
              </Button>
              <div
                className={styles.menu}
                style={show2 ? { display: "block" } : { display: "none" }}
              >
                <Container fluid>
                  <Row xs={12} md={11}>
                    {countries
                      ? countries.map((item, key1) => (
                          <Col xs={12} md="auto" key={key1}>
                            {item.map((item2, key2) => (
                              <Row
                                xs={12}
                                className="justify-content-center"
                                key={key2}
                              >
                                <div
                                  className={styles.menuItem}
                                  href="#"
                                  className={styles.menuItem}
                                >
                                  {item2.name}
                                </div>
                              </Row>
                            ))}
                          </Col>
                        ))
                      : undefined}
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
          <Col sm={5} md="auto">
            <Button className={`${styles.navItem} shadow-none`} href="#">
              Thông tin liên hệ
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid className={styles.SearchBarContainer}>
        <Row className=" justify-content-sm-center justify-content-md-start">
          <Col sm="auto" md={3}>
            <Row className=" justify-content-center justify-content-md-start align-content-center">
              <Col xs="auto" sm="auto" md="auto">
                <img src="/static/icon.png" className={styles.image}></img>
              </Col>
              <Col xs="auto" sm="auto" md={8} className={styles.title}>
                DocoBook
              </Col>
            </Row>
          </Col>
          <Col sm={8} md={6}>
            <Container fluid className={styles.searchBar + " h-100"}>
              <Row className="h-100 align-content-center">
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
};

export default Header;

import { useEffect, useState, useContext } from "react";
import styles from "../../styles/header.module.css";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Context } from "../../Context/Context";

const Header = () => {
  const [space, setSpace] = useState({ top: 0 });
  const categories = useContext(Context).state.categories;
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
            <Dropdown>
              <Dropdown.Toggle
                className={`${styles.navItem} ${styles.dropdownToggle} shadow-none`}
                id="dropdown-autoclose-true"
                as="button"
                href="#"
              >
                Thể loại
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.menu}>
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
                                <Dropdown.Item
                                  href="#"
                                  className={styles.menuItem}
                                >
                                  {item2.name}
                                </Dropdown.Item>
                              </Row>
                            ))}
                          </Col>
                        ))
                      : undefined}
                  </Row>
                </Container>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={5} md="auto">
            <Button className={`${styles.navItem} shadow-none`} href="#">
              Giới thiệu
            </Button>
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

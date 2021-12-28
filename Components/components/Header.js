import { useEffect, useState, useContext } from "react";
import styles from "../../styles/header.module.css";
import { Container, Row, Col, Button, Fade } from "react-bootstrap";
import { Context } from "../../Context/Context";
import SearchHeader from "./SearchHeader";
import Link from "next/link";

const Header = () => {
  const [space, setSpace] = useState({ top: 0 });
  const { categories, countries } = useContext(Context).state;
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [show2, setShow2] = useState(false);
  const [active2, setActive2] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let value = window.scrollY;
      if (value <= 125) setSpace({ top: 0 - value });
      else if (space.top < 125) setSpace({ top: -125 });
    });
    if (localStorage) setUser(JSON.parse(localStorage.getItem("user")));
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
              href="/"
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
              <Fade in={show} unmountOnExit>
                <div className={styles.menu}>
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
                                  <Link
                                    href={"/Categories/" + item2.id.toString()}
                                  >
                                    <div className={styles.menuItem}>
                                      {item2.name}
                                    </div>
                                  </Link>
                                </Row>
                              ))}
                            </Col>
                          ))
                        : undefined}
                    </Row>
                  </Container>
                </div>
              </Fade>
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
              <Fade in={show2} unmountOnExit>
                <div className={styles.menu}>
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
                                  <Link
                                    href={"/Countries/" + item2.id.toString()}
                                  >
                                    <div className={styles.menuItem}>
                                      {item2.name}
                                    </div>
                                  </Link>
                                </Row>
                              ))}
                            </Col>
                          ))
                        : undefined}
                    </Row>
                  </Container>
                </div>
              </Fade>
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
          <Col sm={8} md={6} style={{ position: "relative" }}>
            <Container fluid className={styles.searchBar + " h-100"}>
              <Row className="h-100 align-content-center">
                <Col xs={1} sm="auto" md="auto">
                  <i className={"bi bi-search "}></i>
                </Col>
                <Col xs={10}>
                  <input
                    placeholder="Tìm kiếm..."
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    className={styles.search}
                  ></input>
                </Col>
              </Row>
            </Container>
            <Row>
              <SearchHeader keyword={keyword}></SearchHeader>
            </Row>
          </Col>
          <Col sm="auto" md={3} className="my-2">
            {user ? (
              <Row
                className="justify-content-end align-items-center h-100 text-white"
                style={{ cursor: "default" }}
              >
                <Col xs="auto">
                  <Row className="justify-content-end align-items-center h-100 text-white">
                    <Col xs="auto" className="px-0">
                      Xin chào,
                    </Col>
                    <Col xs="auto" className="px-1">
                      <Link href="/UserProfile/2">
                        <div
                          className="text-white"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {user.username}
                        </div>
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs="auto"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("accessToken");
                    setUser(null);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Đăng xuất
                </Col>
              </Row>
            ) : (
              <Row
                className="justify-content-end align-items-center h-100 text-white"
                style={{ cursor: "default" }}
              >
                <Link href="/SignIn">
                  <Col xs="auto" style={{ cursor: "pointer" }}>
                    Đăng nhập
                  </Col>
                </Link>
                /
                <Link href="/SignUp">
                  <Col xs="auto" style={{ cursor: "pointer" }}>
                    Đăng ký
                  </Col>
                </Link>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Header;

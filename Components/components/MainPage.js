import { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button, Fade } from "react-bootstrap";
import styles from "../../styles/mainPage.module.css";
import { Context } from "../../Context/Context";
import BookCard from "./BookCards/BookCard";
import ChapterCards from "./BookCards/ChapterCard";
import Title from "./Title/Title";
import Discuss from "./Utils/Discuss";

const MainPage = () => {
  const books = useContext(Context).state.books;
  const chapters = useContext(Context).state.chapters;
  const ListMostView = useContext(Context).state.booksByViews;
  const [booksMostView, setBooksMostView] = useState([]);
  const [active, setActive] = useState(0);
  const [length, setLength] = useState(6);
  useEffect(() => {
    let array = [];
    let position = 0;
    if (ListMostView && ListMostView.length > 0) {
      while (position < ListMostView.length) {
        array.push(ListMostView.slice(position, position + length));
        position += length;
      }
    }
    setActive(0);
    setBooksMostView([...array]);
  }, [ListMostView, length]);
  useEffect(() => {
    const updateWindowDimensions = () => {
      if (window.innerWidth < 992)
        if (window.innerWidth < 767) setLength(2);
        else setLength(4);
      else setLength(6);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  return (
    <Container fluid className={styles.mainBox + " py-5 px-3"}>
      <Row>
        <Col xs={12}>
          <h5 className="pb-2">
            <b className="ms-3 bg-dark text-white rounded px-3 py-2">
              Truyện nổi bật
            </b>
          </h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={11} md={10} lg={9}>
          <Row className={styles.customRow + " justify-content-center"}>
            <Button
              className={
                styles.previousStyle + " " + styles.iconStyle + " shadow-none"
              }
              onClick={() => {
                setActive(-1);
                setTimeout(() => {
                  if (active - 1 < 0) setActive(booksMostView.length - 1);
                  else setActive(active - 1);
                }, 500);
              }}
            >
              <i className="bi bi-caret-left-fill"></i>
            </Button>
            <Button
              className={
                styles.nextStyle + " " + styles.iconStyle + " shadow-none"
              }
              onClick={() => {
                setActive(-1);
                setTimeout(() => {
                  if (active + 1 > booksMostView.length - 1) setActive(0);
                  else setActive(active + 1);
                }, 500);
              }}
            >
              <i className="bi bi-caret-right-fill"></i>
            </Button>
            {booksMostView && booksMostView.length > 0 ? (
              booksMostView.map((listbooks, key) => (
                <Fade
                  in={active === key ? true : false}
                  unmountOnExit
                  key={key}
                  timeout={1000}
                >
                  <Row className="justify-content-center align-items-center">
                    {listbooks && listbooks.length > 0 ? (
                      listbooks.map((item, key2) => (
                        <Col xs={6} md={3} lg={2} key={key2}>
                          <BookCard Book={item}></BookCard>
                        </Col>
                      ))
                    ) : (
                      <Row
                        className={
                          styles.customRow +
                          " m-0 justify-content-center align-items-center"
                        }
                      >
                        <div className="spinner-border" role="status"></div>
                      </Row>
                    )}
                  </Row>
                </Fade>
              ))
            ) : (
              <Row
                className={
                  styles.customRow +
                  " m-0 justify-content-center align-items-center"
                }
              >
                <div className="spinner-border" role="status"></div>
              </Row>
            )}
          </Row>
          <Row className="justify-content-end align-items-center pt-2">
            <Col xs="auto" style={{ paddingRight: "1.5rem" }}>
              <Button className={styles.buttonStyle + " shadow-none"}>
                Xem thêm
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Danh sách" name2="mới nhất"></Title>
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
          <Row className="justify-content-end align-items-center pt-2">
            <Col xs="auto">
              <Button className={styles.buttonStyle + " shadow-none"}>
                Xem thêm
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={0} lg={3}>
          <Discuss></Discuss>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Chương" name2="mới nhất"></Title>
        </Col>
        <Col xs={0} md={0} lg={3} className={styles.discussionTitle + " pt-5"}>
          <Title name1="Bình luận" name2="mới"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {chapters && chapters.length > 0 ? (
              chapters.map((item, key) => (
                <Col xs={6} md={3} lg={2} key={key}>
                  <ChapterCards Chapter={item}></ChapterCards>
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
          <Row className="justify-content-end align-items-center pt-2">
            <Col xs="auto">
              <Button className={styles.buttonStyle + " shadow-none"}>
                Xem thêm
              </Button>
            </Col>
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

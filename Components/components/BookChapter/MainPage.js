import { Container, Col, Row } from "react-bootstrap";
import styles from "../../../styles/BookChapter/mainPage.module.css";
import { useContext, useState } from "react";
import { Context } from "../../../Context/BookInfosContext";
import Comment from "./Comment";
import Tool from "./Tool";
import Menu from "./Menu";

const MainPage = () => {
  const { chapter, chapters } = useContext(Context).state;
  const [show, setShow] = useState(false);
  return (
    <Container fluid className={styles.mainContainer}>
      <Menu
        chapter={chapter}
        chapters={chapters}
        show={show}
        setShow={setShow}
      ></Menu>
      {chapter ? (
        <>
          <Container fluid className={styles.myContainer}>
            <Row className="justify-content-center">
              <Col xs="auto">
                <h3>
                  Chương {chapter.chapternumber}: {chapter.name}
                </h3>
              </Col>
            </Row>
            <Row className="justify-content-center pt-2 pb-5">
              <Col xs="auto">
                <h6>
                  {`Độ dài: ${new Intl.NumberFormat("en-US").format(
                    (chapter.content.match(/ /g) || []).length
                  )} từ - Cập nhật cuối: ${chapter.updated_at.slice(
                    0,
                    10
                  )} - Bình luận: `}
                </h6>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col sm={11} md={8}>
                <div
                  className={styles.textStyle}
                  dangerouslySetInnerHTML={{
                    __html: chapter ? chapter.content : "",
                  }}
                ></div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={8} md={12}>
                <Comment></Comment>
              </Col>
            </Row>
          </Container>
          <Container fluid className={styles.tool}>
            <Tool
              chapter={chapter}
              chapters={chapters}
              setShow={setShow}
              show={show}
            ></Tool>
          </Container>
        </>
      ) : undefined}
    </Container>
  );
};

export default MainPage;

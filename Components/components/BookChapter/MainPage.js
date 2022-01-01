import { Container, Col, Row, Modal, Form } from "react-bootstrap";
import styles from "../../../styles/BookChapter/mainPage.module.css";
import { useContext, useState } from "react";
import { Context } from "../../../Context/BookInfosContext";
import Comment from "./Comment";
import Tool from "./Tool";
import Menu from "./Menu";

const MyModal = ({ show, onHide, display, setDisplay }) => {
  const colors = ["#333", "#ccc", "#fff", "#ffe3fe", "#006666", "#FF00FF"];
  const handleFontSize = (e) => {
    let tmp = { ...display };
    tmp.fontSize = e.target.value;
    setDisplay({ ...tmp });
  };
  const handleBackground = (key) => {
    let tmp = { ...display };
    tmp.backgroundColor = colors[key];
    setDisplay({ ...tmp });
  };

  const handleFontColor = (key) => {
    let tmp = { ...display };
    tmp.color = colors[key];
    setDisplay({ ...tmp });
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ border: "3px solid #333", borderBottom: "0" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Tuỳ chỉnh giao diện
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ border: "3px solid #333" }}>
        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col xs="auto">Màu nền:</Col>
            <Col xs="auto">
              <Row className="align-items-center" style={{ minHeight: 55 }}>
                {colors.map((item, key) => (
                  <Col xs="auto" key={key}>
                    <Row
                      className="justify-content-center mt-2"
                      style={{ width: 55 }}
                    >
                      <Col
                        xs="auto"
                        className={styles.boxItem}
                        style={{ backgroundColor: item }}
                        onClick={() => handleBackground(key)}
                      ></Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col xs="auto">Màu chữ:</Col>
            <Col xs="auto">
              <Row className="align-items-center" style={{ minHeight: 55 }}>
                {colors.map((item, key) => (
                  <Col xs="auto" key={key}>
                    <Row
                      className="justify-content-center mt-2"
                      style={{ width: 55 }}
                    >
                      <Col
                        xs="auto"
                        className={styles.boxItem}
                        style={{ backgroundColor: item }}
                        onClick={() => handleFontColor(key)}
                      ></Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-center mt-2">
            <Col xs="auto">Size chữ: </Col>
            <Col xs="auto">
              <Form.Select
                aria-label="Default select example"
                onChange={handleFontSize}
              >
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="22px">22px</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const MainPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { chapter, chapters } = useContext(Context).state;
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState({
    color: "black",
    fontSize: "1rem",
    backgroundColor: "#ffe3fe",
  });
  return (
    <Container fluid className={styles.mainContainer} style={display}>
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
                  )} từ - Cập nhật cuối: ${chapter.updated_at.slice(0, 10)}`}
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
                <Comment chapter={chapter}></Comment>
              </Col>
            </Row>
          </Container>
          <Container fluid className={styles.tool}>
            <Tool
              chapter={chapter}
              chapters={chapters}
              setShow={setShow}
              show={show}
              setModalShow={setModalShow}
            ></Tool>
            <MyModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              display={display}
              setDisplay={setDisplay}
            />
          </Container>
        </>
      ) : undefined}
    </Container>
  );
};

export default MainPage;

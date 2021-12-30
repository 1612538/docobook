import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Form,
} from "react-bootstrap";
import {
  getByBook,
  AddChapter,
  EditChapter,
} from "../../../Services/BookChapters";
import styles from "../../../styles/BookInfos/chapters.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const ChapterModal = ({ book, show, onHide }) => {
  const [chapters, setChapters] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [chapterNumber, setChapterNumber] = useState(null);
  const [content, setContent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await getByBook(book.id);
      setChapters(res);
    };
    if (book) {
      fetchChapter();
    }
    return () => {
      setChapters(null);
    };
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = handleData();
    let res = null;
    let tmp = chapters;
    if (isEdit) {
      res = await EditChapter(data);
      const index = chapters.findIndex((ele) => ele.id === res.id);
      if (index >= 0) {
        tmp[index] = res;
      }
    } else {
      res = await AddChapter(data);
      tmp.push(res);
    }
    setChapters([...tmp]);
    setLoading(false);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
      }, 1500);
    } else {
      setFail(true);
      setTimeout(() => {
        setFail(false);
        setShowForm(false);
      }, 1500);
    }
  };

  const handleData = () => {
    const data = {};
    if (isEdit) {
      data = activeChapter;
    } else {
      data.bookinfo = book;
    }
    data.name = name;
    data.content = content;
    data.chapternumber = chapterNumber;
    return data;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Quản lý chương truyện
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Container fluid>
            <Row className="align-items-center ">
              <Col xs>
                <h5>Danh sách các chương</h5>
              </Col>
              <Col xs="auto">
                <Button
                  className={styles.submitButton}
                  onClick={() => {
                    setShowForm(!showForm);
                    setEdit(false);
                    setActiveChapter(null);
                  }}
                >
                  {showForm ? "Hủy" : "Tạo chương mới"}
                </Button>
              </Col>
            </Row>
            {chapters && chapters.length > 0 ? (
              <Container
                fluid
                className={styles.listContainer}
                style={{ maxHeight: "500px" }}
              >
                {chapters.map((item, key) => (
                  <Row
                    className={styles.listItem}
                    key={key}
                    onClick={() => {
                      setActiveChapter(item);
                      setShowForm(true);
                      setEdit(true);
                      setChapterNumber(item.chapternumber);
                      setContent(item.content);
                      setName(item.name);
                    }}
                  >
                    <Col xs="auto">Chương {item.chapternumber}:</Col>
                    <Col>{item.name}</Col>
                  </Row>
                ))}
              </Container>
            ) : (
              <Container fluid className={styles.listContainer}>
                <Row>Đang cập nhật...</Row>
              </Container>
            )}
          </Container>
          {showForm ? (
            <Container fluid className="mt-3">
              {isEdit ? <h5>Chỉnh sửa</h5> : <h5>Tạo chương mới</h5>}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={10} controlId="formGridName">
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control
                      type="text"
                      key={activeChapter ? activeChapter.id : "-1"}
                      defaultValue={activeChapter ? activeChapter.name : ""}
                      required
                      placeholder="Nhập tiêu đề"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={2} controlId="formGridChapterNumber">
                    <Form.Label>Số chương</Form.Label>
                    <Form.Control
                      type="number"
                      readOnly={isEdit ? true : false}
                      required
                      key={activeChapter ? activeChapter.id : "-1"}
                      defaultValue={
                        activeChapter ? activeChapter.chapternumber : 0
                      }
                      onChange={(e) => {
                        setChapterNumber(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridContent">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Nhập nội dung.."
                    key={activeChapter ? activeChapter.id : "-1"}
                    defaultValue={activeChapter ? activeChapter.content : ""}
                    style={{ height: 200 }}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Row className="justify-content-end align-items-center">
                  {loading ? (
                    <Col xs="auto">
                      <div className="spinner-border" role="status"></div>
                    </Col>
                  ) : undefined}
                  <Col xs="auto">
                    <Button className={styles.submitButton} type="submit">
                      {isEdit ? "Chỉnh sửa" : "Tạo chương"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          ) : undefined}
        </Container>
        <Alert
          show={success}
          variant="success"
          className={styles.alert}
          onClose={() => {
            setSuccess(false);
          }}
        >
          <Row className="justify-content-center align-items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ width: 50, height: 50 }}
            ></FontAwesomeIcon>
            {isEdit ? "Chỉnh sửa" : "Tạo chương mới"} thành công!
          </Row>
        </Alert>
        <Alert
          show={fail}
          onClose={() => {
            setFail(false);
          }}
          variant="danger"
          className={styles.alert}
        >
          <Row className="justify-content-center align-items-center">
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ width: 50, height: 50 }}
            ></FontAwesomeIcon>
            Đã xảy ra lỗi!
          </Row>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};
export default ChapterModal;

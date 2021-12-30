import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import { Context } from "../../../Context/Context";
import styles from "../../../styles/BookCreate/mainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { UpdateBook } from "../../../Services/Books";
import { useContext, useEffect, useState } from "react";

const EditModal = ({ book, show, onHide }) => {
  const { countries, categories, books } = useContext(Context).state;
  const { handleBooks } = useContext(Context).handle;
  const [listCategories, setList] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [country, setCountry] = useState(null);
  const [imgURL, setImgURL] = useState(
    "https://www.pinclipart.com/picdir/big/126-1266771_post-page-to-add-pictures-comments-add-post.png"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (book) {
      setImgURL("http://localhost:1337" + book.image.url);
      setCountry(book.country);
      setList([...book.categories]);
      setName(book.name);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = book;
    data.name = name;
    data.description = description;
    data.country = country;
    data.categories = listCategories;
    data.uploader = JSON.parse(localStorage.getItem("user"));
    console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (file) formData.append("files.image", file, file.name);
    const res = await UpdateBook(formData);
    setLoading(false);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 1500);
    } else {
      setFail(true);
      setTimeout(() => {
        setFail(false);
        onHide();
      }, 1500);
    }
    let tmp = books;
    const index = books.findIndex((ele) => ele.id === data.id);
    if (index >= 0) {
      tmp[index] = data;
      handleBooks([...tmp]);
    }
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
          Chỉnh sửa truyện
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Container fluid>
            <Row>
              <Col xs={12} lg={3}>
                <Row className="justify-content-center align-items-center">
                  <label htmlFor="myInputFile" className={styles.imageField}>
                    <img src={imgURL} className={styles.image} />
                    <input
                      type="file"
                      name="myInputFile"
                      id="myInputFile"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setImgURL(
                          window.URL.createObjectURL(e.target.files[0])
                        );
                      }}
                      required
                      accept="image/*"
                    />
                  </label>
                </Row>
                <Row className="justify-content-center align-items-center mt-2 text-info">
                  Click ảnh để thay đổi
                </Row>
              </Col>
              <Col xs={12} lg={9}>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} controlId="formGridName">
                      <Form.Label>Tên truyện</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={name}
                        placeholder="Nhập tên truyện.."
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={6} controlId="formGridCountry">
                      <Form.Label>Quốc gia</Form.Label>
                      <Form.Select
                        defaultValue={country ? country.name : "Chọn.."}
                        onChange={(e) => {
                          if (countries && countries.length > 0)
                            for (let i of countries) {
                              const value = i.find(
                                (ele) => ele.name === e.target.value
                              );
                              if (value) {
                                setCountry(value);
                                break;
                              }
                            }
                        }}
                      >
                        {countries && countries.length > 0 ? (
                          countries.map((item, key) =>
                            item.map((item2, key2) => (
                              <option
                                key={key2.toString() + " " + key.toString()}
                              >
                                {item2.name}
                              </option>
                            ))
                          )
                        ) : (
                          <option>Chọn..</option>
                        )}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={6} controlId="formGridCategories">
                      <Form.Label>Thể loại</Form.Label>
                      <Form.Select
                        defaultValue="Chọn.."
                        onChange={(e) => {
                          let newList = listCategories;
                          if (
                            newList.find((ele) => ele.name === e.target.value)
                          )
                            return;
                          if (categories && categories.length > 0)
                            for (let i of categories) {
                              const value = i.find(
                                (ele) => ele.name === e.target.value
                              );
                              if (value) {
                                newList.push(value);
                                break;
                              }
                            }
                          setList([...newList]);
                        }}
                      >
                        <option>Chọn..</option>
                        {categories && categories.length > 0 ? (
                          categories.map((item, key) =>
                            item.map((item2, key2) =>
                              listCategories.find(
                                (ele) => ele.name === item2.name
                              ) ? undefined : (
                                <option
                                  key={key2.toString() + " " + key.toString()}
                                >
                                  {item2.name}
                                </option>
                              )
                            )
                          )
                        ) : (
                          <option>Chọn..</option>
                        )}
                      </Form.Select>
                      <Row className="mt-3">
                        {listCategories.map((item, key) => (
                          <Col xs="auto" key={key} className={styles.category}>
                            <Row className="align-items-center">
                              <Col xs>{item ? item.name : undefined}</Col>
                              <Col
                                xs="auto"
                                className={styles.x_button}
                                onClick={() => {
                                  let array = listCategories;
                                  array.splice(key, 1);
                                  setList([...array]);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTimesCircle}
                                  style={{ width: 16, height: 16 }}
                                ></FontAwesomeIcon>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Mô tả sơ lược</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Nhập mô tả.."
                      defaultValue={description ? description : ""}
                      style={{ height: 200 }}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
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
                        Chỉnh sửa
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
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
              Chỉnh sửa thành công!
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
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default EditModal;

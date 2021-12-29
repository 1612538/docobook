import { useContext, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Context } from "../../../Context/Context";
import styles from "../../../styles/BookCreate/mainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MainPage = () => {
  const { countries, categories } = useContext(Context).state;
  const [listCategories, setList] = useState([]);
  return (
    <Container fluid className={styles.mainContainer}>
      <Container fluid className={styles.myContainer}>
        <Row>
          <Col xs={12} lg={3}>
            <Row className="justify-content-center align-items-center">
              <label htmlFor="myInputFile" className={styles.imageField}>
                <img
                  src="https://www.pinclipart.com/picdir/big/126-1266771_post-page-to-add-pictures-comments-add-post.png"
                  className={styles.image}
                />
                <input
                  type="file"
                  name="myInputFile"
                  id="myInputFile"
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </label>
            </Row>
            <Row className="justify-content-center align-items-center mt-2">
              Bìa sách
            </Row>
          </Col>
          <Col xs={12} lg={9}>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} controlId="formGridName">
                  <Form.Label>Tên sách</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tên sách.." />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} xs={6} controlId="formGridCountry">
                  <Form.Label>Quốc gia</Form.Label>
                  <Form.Select defaultValue="Chọn..">
                    {countries && countries.length > 0 ? (
                      countries.map((item, key) =>
                        item.map((item2, key2) => (
                          <option key={key2.toString() + " " + key.toString()}>
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
                      if (newList.find((ele) => ele.name === e.target.value))
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
                    {categories && categories.length > 0 ? (
                      categories.map((item, key) =>
                        item.map((item2, key2) => (
                          <option key={key2.toString() + " " + key.toString()}>
                            {item2.name}
                          </option>
                        ))
                      )
                    ) : (
                      <option>Chọn..</option>
                    )}
                  </Form.Select>
                  <Row className="mt-3">
                    {listCategories.map((item, key) => (
                      <Col xs="auto" key={key} className={styles.category}>
                        <Row className="align-items-center">
                          <Col xs="auto">{item ? item.name : undefined}</Col>
                          <Col
                            xs
                            className={styles.x_button}
                            onClick={() => {
                              let array = listCategories;
                              array.splice(key, 1);
                              setList([...array]);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimesCircle}
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
                  style={{ height: 100 }}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </Form.Group>
              <Row className="justify-content-end">
                <Col xs="auto">
                  <Button className={styles.submitButton} type="submit">
                    Đăng sách
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default MainPage;

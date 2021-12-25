import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/SignUp/SignUp.module.css";
import { useState } from "react";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmailText, setErrorEmailText] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (errorEmailText) return;
  };
  const handleEmail = (e) => {
    let re = /.+@.+\.[A-Za-z]+$/;
    if (re.test(e.target.value)) {
      setEmail(e.target.value);
      setErrorEmailText(null);
    } else {
      setErrorEmailText("Email không hợp lệ");
    }
  };
  return (
    <Container fluid className={styles.root}>
      <Col xs={12} md={3} className={styles.myContainer}>
        <Container fluid className={styles.formBox}>
          <Container fluid>
            <Col xs={12} className={styles.title}>
              <h3>Đăng ký</h3>
            </Col>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="pt-5"
            >
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label>
                    <b>Email</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="email"
                      className={styles.formFormat}
                      placeholder="Nhập email.."
                      onChange={handleEmail}
                      required
                    />
                    {errorEmailText ? (
                      <Row className="text-danger p-1 m-0">
                        {errorEmailText}
                      </Row>
                    ) : (
                      <Form.Control.Feedback type="invalid">
                        Bạn chưa nhập email
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label>
                    <b>Mật khẩu</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="password"
                      className={styles.formFormat}
                      placeholder="Nhập mật khẩu.."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập mật khẩu
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label>
                    <b>Nhập lại mật khẩu</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="password"
                      className={styles.formFormat}
                      placeholder="Nhập mật khẩu.."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập lại mật khẩu
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label>
                    <b>Username</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="password"
                      className={styles.formFormat}
                      placeholder="Nhập username.."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập username
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label>
                    <b>Họ tên</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="password"
                      className={styles.formFormat}
                      placeholder="Nhập họ tên.."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập họ tên
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={10} className="mx-auto mt-5 mb-4">
                <Button type="submit" className={styles.buttonLogin}>
                  Đăng ký
                </Button>
              </Col>
              <Col xs={12} className="mb-3">
                <Row className="justify-content-end">
                  <Col xs="auto" className="p-0">
                    Bạn đã có tài khoản? <a href="/SignIn">Đăng nhập</a>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Container>
        </Container>
      </Col>
    </Container>
  );
};

export default SignUp;

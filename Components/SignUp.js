import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import styles from "../styles/SignUp/SignUp.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Register } from "../Services/Auth";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");
  const [fail, setFail] = useState(false);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    if (errorEmailText || errorPassword2) return;
    const res = await Register({ email, username, password, fullname });
    if (res === null) {
      setFail(true);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      router.push("/SignIn");
    }, 1500);
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
            <Row className="justify-content-center mb-2">
              <Col xs="auto" className={styles.avatar}>
                <FontAwesomeIcon icon={faLock} />
              </Col>
            </Row>
            <Col xs={12} className={styles.title}>
              <h3>Đăng ký</h3>
            </Col>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="pt-4"
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />{" "}
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
                      onChange={(e) => {
                        if (e.target.value !== password)
                          setErrorPassword2("Mật khẩu không trùng khớp");
                        else setErrorPassword2(null);
                      }}
                      required
                    />
                    {errorPassword2 ? (
                      <Row className="text-danger p-1 m-0">
                        {errorPassword2}
                      </Row>
                    ) : (
                      <Form.Control.Feedback type="invalid">
                        Bạn chưa nhập lại mật khẩu
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={12} className="px-1">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalText1"
                >
                  <Form.Label>
                    <b>Username</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="text"
                      className={styles.formFormat}
                      placeholder="Nhập username.."
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
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
                  controlId="formHorizontalText2"
                >
                  <Form.Label>
                    <b>Họ tên</b>
                  </Form.Label>
                  <Col xs={12}>
                    <Form.Control
                      type="text"
                      className={styles.formFormat}
                      placeholder="Nhập họ tên.."
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
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
      <Alert
        show={success}
        dismissible
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
          Đăng ký thành công. Đang điều hướng..
        </Row>
      </Alert>
      <Alert
        show={fail}
        onClose={() => {
          setFail(false);
        }}
        dismissible
        variant="danger"
        className={styles.alert}
      >
        <Row className="justify-content-center align-items-center">
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{ width: 50, height: 50 }}
          ></FontAwesomeIcon>
          Username hoặc Email đã được sử dụng
        </Row>
      </Alert>
    </Container>
  );
};

export default SignUp;

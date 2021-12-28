import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/SignIn/SignIn.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { LogIn } from "../Services/Auth";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [errorEmailText, setErrorEmailText] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (errorEmailText) return;
    event.preventDefault();
    const res = await LogIn({ email, password });
    if (res === null) {
      setFail(true);
      return;
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
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
  const handlePassword = (e) => {
    setPassword(e.target.value);
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
              <h3>Đăng nhập</h3>
            </Col>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="pt-4"
            >
              <Col xs={12} className="p-1">
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
                      onChange={handlePassword}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập mật khẩu
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Form.Group className="mb-3 px-1" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Nhớ thông tin" />
              </Form.Group>
              <Col xs={10} className="mx-auto mt-5 mb-4">
                <Button type="submit" className={styles.buttonLogin}>
                  Đăng nhập
                </Button>
              </Col>
              <Col xs={12} className="mb-3">
                <Row className="justify-content-end">
                  <Col xs="auto" className="p-0">
                    Bạn là thành viên mới? <a href="/SignUp">Tạo tài khoản</a>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row className="justify-content-end">
                  <Col xs="auto" className="p-0">
                    <a href="#">Quên mật khẩu?</a>
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

export default SignIn;

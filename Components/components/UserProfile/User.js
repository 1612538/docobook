import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { Context as UserContext } from "../../../Context/User";
import styles from "../../../styles/UserProfile/MainPage.module.css";

const User = () => {
  const { user } = useContext(UserContext).state;
  return (
    <Container fluid className={styles.userProfile}>
      <Row className={styles.rowFormat + " align-items-center h-100"}>
        {user ? (
          <>
            <Col sm={12} md={6} lg={9}>
              <Row className="align-items-center justify-content-center">
                <Col xs={8} className="py-1">
                  <span>
                    <b>Họ tên: </b>
                    {user.fullname}
                  </span>
                </Col>
                <Col xs={8} className="py-1">
                  <span>
                    <b>Username: </b> {user.username}
                  </span>
                </Col>
                <Col xs={8} className="py-1">
                  <span>
                    <b>Email: </b> {user.email}
                  </span>
                </Col>
                <Col xs={8} className="py-1">
                  <span>
                    <b>Trạng thái: </b>
                    {user.confirmed ? "Đã xác thực" : "Chưa xác thực"}
                  </span>
                </Col>
                <Col xs={8} className="py-1">
                  <span>
                    <b>Vai trò: </b>{" "}
                    {user.userRole === 1
                      ? "Quản trị viên"
                      : user.userRole === 0
                      ? "Thành viên"
                      : "Super Admin"}
                  </span>
                </Col>
                <Col xs={8} className="py-1">
                  <span>
                    <b>Cập nhật lần cuối: </b> {user.created_at.slice(0, 10)}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6} lg={3}>
              <Row className="justify-content-center p-3">
                <Row className={styles.avatar}></Row>
              </Row>
            </Col>
          </>
        ) : (
          <Row
            className="m-0 justify-content-center align-items-center"
            style={{ height: 100 }}
          >
            <div className="spinner-border" role="status"></div>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default User;

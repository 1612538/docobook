import { Container, Row, Col, Button, Fade } from "react-bootstrap";
import Link from "next/link";
import styles from "../../../styles/Admin/mainPage.module.css";

const MainPage = () => {
  return (
    <div>
      <Container fluid className={styles.mainContainer + " pt-5 pb-3 px-3"}>
        <Container fluid className={styles.myContainer}>
          <Row className="justify-content-left">
            <Col sm={5} md="auto">
              <Link
                href="./ManageBook"
              >
                <div
                  className={styles.navItem}
                >Quản lý sách
                </div>

              </Link>
            </Col>
            <Col sm={5} md="auto">
              <Link
                href="./ManageCategory"
              >
                <div
                  className={styles.navItem}>
                  Quản lý thể loại
                </div>
              </Link>
            </Col>
            <Col sm={5} md="auto">
              <Link
                href="./ManageUser"
              >
                <div
                  className={styles.navItem}>
                  Quản lý người dùng
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default MainPage;

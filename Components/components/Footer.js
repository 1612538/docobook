import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import styles2 from "../../styles/footer.module.css";

export default function MainPage() {
  return (
    <footer className={styles.footer}>
      <Container fluid className={styles2.footer}>
        <Row className="justify-content-md-center">
          <Col sm={6} md={5}>
            <div>© 2021-2022 Cổng Light Novel - DocoBook Website</div>
          </Col>
          <Col sm={6} md={3}>
            <div>
              © Liên hệ: <b style={{ color: "#b4aee8" }}>SM12Group@gmail.com</b>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

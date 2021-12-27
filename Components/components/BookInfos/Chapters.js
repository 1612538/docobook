import { useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/BookInfos/chapters.module.css";
import Link from "next/link";

const Chapters = () => {
  const { chapters } = useContext(Context).state;
  return (
    <Container fluid className={styles.myContainer}>
      <Container fluid>
        <h5>Danh sách các chương</h5>
        {chapters && chapters.length > 0 ? (
          <Container fluid className={styles.listContainer}>
            {chapters.map((item, key) => (
              <Link
                href={`/BookInfos/${item.bookinfo.id}/${item.chapternumber}`}
                key={key}
              >
                <Row className={styles.listItem}>
                  <Col xs="auto">Chương {item.chapternumber}:</Col>
                  <Col>{item.name}</Col>
                </Row>
              </Link>
            ))}
          </Container>
        ) : (
          <Container fluid className={styles.listContainer}>
            <Row>Đang cập nhật...</Row>
          </Container>
        )}
      </Container>
    </Container>
  );
};
export default Chapters;

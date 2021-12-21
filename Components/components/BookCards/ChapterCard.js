import styles from "../../../styles/chaptercard.module.css";
import { Container, Col, Row, Fade } from "react-bootstrap";

const ChapterCard = ({ Chapter }) => {
  return (
    <Container className={styles.noPadding + " my-2"}>
      <Col xs={12}>
        <Row style={{ margin: 0, position: "relative" }}>
          <div
            style={{
              backgroundImage: `url("http://localhost:1337${Chapter.bookinfo.image.url}")`,
            }}
            className={styles.imgCustom}
          ></div>
          <div className={styles.chaptertitle}>
            <b>Chương {Chapter.chapternumber}: </b>
            <br></br>
            {Chapter.name}
          </div>
        </Row>
        <Row className={styles.title}>{Chapter.bookinfo.name}</Row>
      </Col>
    </Container>
  );
};

export default ChapterCard;

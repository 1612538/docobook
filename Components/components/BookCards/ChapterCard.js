import styles from "../../../styles/chaptercard.module.css";
import { Container, Col, Row, Fade } from "react-bootstrap";
import Link from "next/link";

const ChapterCard = ({ Chapter }) => {
  return (
    <Container className={styles.noPadding + " my-2"}>
      <Col xs={12}>
        <Row style={{ margin: 0, position: "relative" }}>
          <Link
            href={`/BookInfos/${Chapter.bookinfo.id}/${Chapter.chapternumber}`}
          >
            <div
              style={{
                backgroundImage: `url("http://localhost:1337${Chapter.bookinfo.image.url}")`,
              }}
              className={styles.imgCustom}
            ></div>
          </Link>
          <div className={styles.chaptertitle}>
            <b>Chương {Chapter.chapternumber}: </b>
            <br></br>
            {Chapter.name}
          </div>
        </Row>
        <Row className={styles.title + " px-0"}>
          <Link href={`/BookInfos/${Chapter.bookinfo.id}`}>
            <div>{Chapter.bookinfo.name}</div>
          </Link>
        </Row>
      </Col>
    </Container>
  );
};

export default ChapterCard;

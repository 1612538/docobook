import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/BookInfos/Comment.module.css";

const Comment = () => {
  return (
    <Container fluid className={styles.myContainer}>
      <Row className={styles.Header}>Bình luận</Row>
      <Container fluid className={styles.commentSection}></Container>
    </Container>
  );
};
export default Comment;

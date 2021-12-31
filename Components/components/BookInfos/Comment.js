import { useEffect, useState, useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../../../styles/BookInfos/Comment.module.css";
import { getByBook } from "../../../Services/Comment";

const Comment = () => {
  const [comments, setComments] = useState(null);
  const { book } = useContext(Context).state;
  useEffect(() => {
    const fetchData = async () => {
      const res = await getByBook(book.id);
      setComments(res);
    };
    if (book) fetchData();
  }, [book]);

  return (
    <Container fluid className={styles.myContainer}>
      <Row className={styles.Header}>
        Bình luận{comments ? ` (${comments.length})` : undefined}
      </Row>
      <Container fluid className={styles.commentSection}>
        {comments ? (
          comments.length > 0 ? (
            comments.map((item, key) => (
              <Container fluid className="mt-3" key={key}>
                <Row>
                  <Col xs="auto">
                    <Row className="justify-content-center">
                      <Col className={styles.avatar}></Col>
                    </Row>
                  </Col>
                  <Col
                    xs
                    style={{
                      backgroundColor: "#d2cfeb",
                      borderRadius: "4px",
                      marginLeft: "1rem",
                    }}
                  >
                    <Row className="justify-content-between">
                      <Col xs="auto">{item.user.username}</Col>
                      <Col xs="auto">{item.created_at.slice(0, 10)}</Col>
                    </Row>
                    <Row className="justify-content-start">
                      <Col xs="auto">{item.content}</Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ))
          ) : (
            <Container fluid className="mt-5">
              <Row className="justify-content-center">
                Chưa có bình luận nào
              </Row>
            </Container>
          )
        ) : (
          <Container fluid className="mt-5">
            <Row className="justify-content-center">
              <div className="spinner-border" role="status"></div>
            </Row>
          </Container>
        )}
      </Container>
    </Container>
  );
};
export default Comment;

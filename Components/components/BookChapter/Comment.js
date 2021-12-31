import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../../../styles/BookInfos/Comment.module.css";
import Link from "next/link";
import { getByChapter, AddComment } from "../../../Services/Comment";

const Comment = ({ chapter }) => {
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getByChapter(chapter.id);
      setComments(res);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      content: comment,
      bookchapter: chapter,
      user: JSON.parse(localStorage.getItem("user")),
      emoji,
    };
    const res = await AddComment(data);
    if (res) {
      let tmp = comments;
      tmp.push(res);
      setComments(comments);
    }
    setLoading(false);
  };
  return (
    <Container fluid className={styles.myContainer}>
      <Row className={styles.Header}>
        Bình luận{comments ? ` (${comments.length})` : undefined}
      </Row>
      <Container fluid className={styles.commentSection}>
        {localStorage.getItem("user") ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3" controlId="formGridComment">
              <Form.Label>Bình luận của bạn</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Nhập bình luận"
                style={{ height: 120 }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>
            <Row className="justify-content-end align-items-center">
              {loading ? (
                <Col xs="auto">
                  <div className="spinner-border" role="status"></div>
                </Col>
              ) : undefined}
              <Col xs="auto">
                <Button className={styles.submitButton} type="submit">
                  Đăng bình luận
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row className="justify-content-center my-3">
            <Col xs="auto">
              Bạn phải <Link href="/SignIn">đăng nhập</Link> để bình luận
            </Col>
          </Row>
        )}
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

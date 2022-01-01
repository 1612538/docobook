import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../../../styles/BookInfos/Comment.module.css";
import Link from "next/link";
import { getByChapter, AddComment } from "../../../Services/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ chapter }) => {
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emoji, setEmoji] = useState(0);
  const [hide, setHide] = useState(false);
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

  const icons = [
    {
      url: "https://icon-library.com/images/facebook-heart-icon-png/facebook-heart-icon-png-11.jpg",
      total: 0,
    },
    {
      url: "https://clipartpngfree.com/thumbnail/brands/haha_computer_icons_irc_facebook_thumb.png",
      total: 0,
    },
    {
      url: "https://seeklogo.com/images/F/facebook-sad-logo-B96987925F-seeklogo.com.png",
      total: 0,
    },
    {
      url: "https://icon-library.com/images/yellow-facebook-icon-png/yellow-facebook-icon-png-23.jpg",
      total: 0,
    },
    {
      url: "https://cdn.iconscout.com/icon/free/png-256/angry-face-14-894765.png",
      total: 0,
    },
  ];

  return (
    <>
      <Row className="justify-content-center mt-5">
        {icons.map((item, key) => (
          <Col xs="auto" key={key}>
            <Row className="justify-content-center align-items-center flex-column">
              <Col xs="auto">
                <img src={item.url} style={{ width: 50, height: 50 }}></img>
              </Col>
              <Col xs="auto">{item.total}</Col>
            </Row>
          </Col>
        ))}
      </Row>
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
                  <Row
                    className="justify-content-center mt-1 align-items-center"
                    style={{ height: 60 }}
                  >
                    {hide ? (
                      <>
                        <Col
                          className="m-0 p-0"
                          style={{ width: 60, cursor: "pointer" }}
                        >
                          <Row className="justify-content-center m-0 p-0 w-100">
                            <Col xs="auto" className="p-0">
                              <img
                                src={icons[emoji - 1].url}
                                className={styles.icon}
                              ></img>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          className="m-0 p-0"
                          style={{ width: 60, cursor: "pointer" }}
                          onClick={() => {
                            setEmoji(0);
                            setHide(false);
                          }}
                        >
                          <Row className="justify-content-center m-0 p-0 w-100">
                            <Col xs="auto" className="p-0">
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className={styles.icon}
                              ></FontAwesomeIcon>
                            </Col>
                          </Row>
                        </Col>
                      </>
                    ) : (
                      icons.map((item, key) => (
                        <Col
                          key={key}
                          className="m-0 p-0"
                          style={{ width: 60, cursor: "pointer" }}
                          onClick={() => {
                            setEmoji(key + 1);
                            setHide(true);
                          }}
                        >
                          <Row className="justify-content-center m-0 p-0 w-100">
                            <Col xs="auto" className="p-0">
                              <img src={item.url} className={styles.icon}></img>
                            </Col>
                          </Row>
                        </Col>
                      ))
                    )}
                  </Row>
                </Col>
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
    </>
  );
};
export default Comment;

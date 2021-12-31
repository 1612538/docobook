import Title from "../Title/Title";
import BookCard from "../BookCards/BookCard";
import styles from "../../../styles/UserProfile/MainPage.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getByUser as getBooks } from "../../../Services/Favorite";
import { getByUser as getChapters } from "../../../Services/Saved";
import ChapterCard from "../BookCards/ChapterCard";

const UserMainPage = () => {
  const [books, setBooks] = useState(null);
  const [chapters, setChapters] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const id = JSON.parse(localStorage.getItem("user")).id;
      const res1 = await getBooks(id);
      setBooks(res1);
      const res2 = await getChapters(id);
      setChapters(res2);
    };
    if (localStorage.getItem("user")) fetchData();
  }, []);
  return (
    <>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Danh sách" name2="yêu thích"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {books ? (
              books.length > 0 ? (
                books.map((item, key) => (
                  <Col xs={6} md={3} lg={2} key={key}>
                    <BookCard Book={item.bookinfo}></BookCard>
                  </Col>
                ))
              ) : (
                <Row
                  className="m-0 justify-content-center align-items-center"
                  style={{ height: 100 }}
                >
                  Không có dữ liệu
                </Row>
              )
            ) : (
              <Row
                className="m-0 justify-content-center align-items-center"
                style={{ height: 100 }}
              >
                <div className="spinner-border" role="status"></div>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9} className="pt-5">
          <Title name1="Chương" name2="đánh dấu"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {chapters ? (
              chapters.length > 0 ? (
                chapters.map((item, key) => (
                  <Col xs={6} md={3} lg={2} key={key}>
                    <ChapterCard Chapter={item.bookchapter}></ChapterCard>
                  </Col>
                ))
              ) : (
                <Row
                  className="m-0 justify-content-center align-items-center"
                  style={{ height: 100 }}
                >
                  Không có dữ liệu
                </Row>
              )
            ) : (
              <Row
                className="m-0 justify-content-center align-items-center"
                style={{ height: 100 }}
              >
                <div className="spinner-border" role="status"></div>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default UserMainPage;

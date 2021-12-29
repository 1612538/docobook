import Title from "../Title/Title";
import BookCard from "../BookCards/BookCard";
import styles from "../../../styles/UserProfile/MainPage.module.css";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { Context } from "../../../Context/Context";
import Link from "next/link";

const ModMainPage = ({ books, user }) => {
  return (
    <>
      <Row>
        <Col xs={12} sm={7} className="pt-5">
          <Title name1="Truyện" name2="đã đăng"></Title>
        </Col>
        {localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).id === user.id ? (
          <Link href="/UserProfile/CreateBook">
            <Col xs={12} sm="auto" className="mt-4">
              <Button className={styles.addButton}>+ Thêm truyện</Button>
            </Col>
          </Link>
        ) : undefined}
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {books ? (
              books.length > 0 ? (
                books.map((item, key) => (
                  <Col xs={6} md={3} lg={2} key={key}>
                    <BookCard Book={item}></BookCard>
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

export default ModMainPage;

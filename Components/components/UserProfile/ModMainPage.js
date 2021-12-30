import Title from "../Title/Title";
import BookCard from "../BookCards/BookCard";
import styles from "../../../styles/UserProfile/MainPage.module.css";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditModal from "./EditModal";
import ChapterModal from "./ChapterModal";

const ModMainPage = ({ books, user }) => {
  const [isEdit, setEdit] = useState(false);
  const [isView, setView] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [activeBook, setActiveBook] = useState(null);

  return (
    <>
      <Row>
        <Col xs={12} sm="auto" className="pt-5">
          <Title name1="Truyện" name2="đã đăng"></Title>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={9}>
          <Row className="justify-content-center align-items-center">
            {books ? (
              books.length > 0 ? (
                books.map((item, key) => (
                  <Col
                    xs={6}
                    md={3}
                    lg={2}
                    key={key}
                    style={{ position: "relative" }}
                  >
                    <BookCard Book={item}></BookCard>
                    {isEdit ? (
                      <Button
                        className={styles.editIcon}
                        onClick={() => {
                          setActiveBook({ ...item });
                          setModalShow(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ width: 20, height: 20 }}
                        ></FontAwesomeIcon>
                      </Button>
                    ) : undefined}
                    {isView ? (
                      <Button
                        className={styles.listIcon}
                        onClick={() => {
                          setActiveBook({ ...item });
                          setModalShow(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBars}
                          style={{ width: 20, height: 20 }}
                        ></FontAwesomeIcon>
                      </Button>
                    ) : undefined}
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
        {localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).id === user.id ? (
          <Col xs={12} lg={3}>
            <Row className="justify-content-center">
              <Link href="/UserProfile/CreateBook">
                <Col xs="auto" className="mt-1">
                  <Button className={styles.addButton}>+ Thêm truyện</Button>
                </Col>
              </Link>
              <Col xs="auto" className="mt-2">
                <Button
                  className={styles.editButton}
                  onClick={() => {
                    setEdit(!isEdit);
                    setView(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ width: 22, height: 16 }}
                  ></FontAwesomeIcon>{" "}
                  Chỉnh sửa
                </Button>
              </Col>
              <Col xs="auto" className="my-2">
                <Button
                  className={styles.listButton}
                  onClick={() => {
                    setView(!isView);
                    setEdit(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ width: 22, height: 16 }}
                  ></FontAwesomeIcon>{" "}
                  Xem chương
                </Button>
              </Col>
            </Row>
          </Col>
        ) : undefined}
        {isView ? (
          <ChapterModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            book={activeBook}
          ></ChapterModal>
        ) : undefined}
        {isEdit ? (
          <EditModal
            show={modalShow}
            book={activeBook}
            onHide={() => setModalShow(false)}
          ></EditModal>
        ) : undefined}
      </Row>
    </>
  );
};

export default ModMainPage;

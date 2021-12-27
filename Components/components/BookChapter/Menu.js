import { Container, Col, Row } from "react-bootstrap";
import styles from "../../../styles/BookChapter/mainPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Menu = ({ chapter, chapters, show, setShow }) => {
  const handleClick = () => {
    setShow(false);
  };
  return (
    <Container
      fluid
      className={styles.listChapter}
      style={show ? { left: "0px" } : { left: "-90%" }}
    >
      {chapter ? (
        <>
          <Row className={styles.header}>
            <div className={styles.closeButton} onClick={handleClick}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </div>
            <div>{chapter.bookinfo.name}</div>
          </Row>
          <Row className={styles.list}>
            {chapters ? (
              chapters.length > 0 ? (
                chapters.map((item, key) => (
                  <Link
                    href={
                      "/BookInfos/" +
                      item.bookinfo.id +
                      "/" +
                      item.chapternumber
                    }
                    key={key}
                  >
                    <Row className={styles.listItem + " align-items-center"}>
                      <Col
                        className={styles.image}
                        style={{
                          backgroundImage: `url("http://localhost:1337${item.bookinfo.image.url}")`,
                        }}
                      ></Col>
                      <Col xs className={styles.titleChapter}>
                        Chương {item.chapternumber}: {item.name}
                      </Col>
                    </Row>
                  </Link>
                ))
              ) : (
                <Row className="justify-content-center">Đang cập nhật</Row>
              )
            ) : undefined}
          </Row>
        </>
      ) : undefined}
    </Container>
  );
};

export default Menu;

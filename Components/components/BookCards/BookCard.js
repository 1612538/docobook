import { useEffect, useState } from "react";
import styles from "../../../styles/card.module.css";
import { Container, Col, Row } from "react-bootstrap";

const BookCard = ({ Book }) => {
  return (
    <Container className={styles.noPadding + " my-2"}>
      <Col xs={12}>
        <Row>
          <div
            style={{
              backgroundImage: `url("http://localhost:1337${Book.image.url}")`,
            }}
            className={styles.imgCustom}
          ></div>
        </Row>
        <Row className={styles.title}>{Book.name}</Row>
      </Col>
    </Container>
  );
};

export default BookCard;

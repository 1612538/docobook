import { useEffect, useState } from "react";
import styles from "../../../styles/searchcard.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Link from "next/link";

const SearchCard = ({ Book }) => {
  return (
    <Container className={styles.noPadding + " my-1"}>
      <Link href={"/BookInfos/" + Book.id}>
        <Row>
          <Col xs={4} lg={3} xl={2}>
            <div
              style={{
                backgroundImage: `url("http://localhost:1337${Book.image.url}")`,
              }}
              className={styles.imgCustom}
            ></div>
          </Col>
          <Col xs={8} lg={9} xl={10} className="d-flex align-items-center">
            <Row className={styles.title}>{Book.name}</Row>
          </Col>
        </Row>
      </Link>
    </Container>
  );
};

export default SearchCard;

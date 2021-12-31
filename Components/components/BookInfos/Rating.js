import styles from "../../../styles/BookInfos/bookDetail.module.css";
import {
  Container,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

const Rate = ({ book }) => {
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const handleRating = () => {
    setRating(rating);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={30}
                label
                transition
                fillColor="#fdda0d"
                emptyColor="gray"
              ></Rating>
            </Col>
            <Col xs="auto" className="mt-2">
              <Button className={styles.rateButton}>Gửi đánh giá</Button>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  );
  return (
    <Row className="justify-content-center">
      <Row
        className={styles.cssStar + " justify-content-center"}
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        <OverlayTrigger placement="top" overlay={popover} show={show}>
          <i className="bi bi-star-fill"></i>
        </OverlayTrigger>
      </Row>
      <Row className="justify-content-center w-100">Đánh giá</Row>
      <Row className="justify-content-center w-100">
        {book.rate ? book.rate : "0"}/5
      </Row>
    </Row>
  );
};

export default Rate;

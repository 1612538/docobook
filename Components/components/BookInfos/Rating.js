import styles from "../../../styles/BookInfos/bookDetail.module.css";
import {
  Container,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { Rating } from "react-simple-star-rating";
import { AddRating, getOne } from "../../../Services/Ratings";
import { Update } from "../../../Services/Books";

const Rate = ({ book }) => {
  const { handleBook } = useContext(Context).handle;
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const [isRated, setRated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const id = JSON.parse(localStorage.getItem("user")).id;
      const res = await getOne(id, book.id);
      if (res) setRated(true);
    };
    if (localStorage.getItem("user") && book) fetchData();
  }, [book ? book.id : book]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleClick = async () => {
    if (localStorage.getItem("user") === undefined)
      alert("Bạn phải đăng nhập để đánh giá!");
    else if (rating === 0) alert("Bạn chưa chọn đánh giá!");
    else {
      setShow(false);
      setLoading(true);
      const data = {
        rate: rating / 20,
        bookinfo: book,
        user: JSON.parse(localStorage.getItem("user")),
      };
      const res = await AddRating(data);
      if (res) {
        let data2 = {
          id: book.id,
          rate: book.rate
            ? (
                (book.rate * book.ratevote + rating / 20) /
                (book.ratevote + 1)
              ).toFixed(1)
            : rating / 20,
          ratevote: book.ratevote ? book.ratevote + 1 : 1,
        };
        const res2 = await Update(data2);
        if (res2) {
          handleBook({ ...res2 });
          setRated(true);
        }
      }
      setLoading(false);
    }
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
              <Button className={styles.rateButton} onClick={handleClick}>
                Gửi đánh giá
              </Button>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  );
  return (
    <Row className="justify-content-center">
      {loading ? (
        <Row className={styles.cssStar + " justify-content-center"}>
          <div className="spinner-border" role="status"></div>
        </Row>
      ) : isRated ? (
        <Row className={styles.cssStar + " justify-content-center"}>
          <i className="bi bi-star-fill"></i>
        </Row>
      ) : (
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
            <i className="bi bi-star"></i>
          </OverlayTrigger>
        </Row>
      )}
      <Row className="justify-content-center w-100">Đánh giá</Row>
      <Row className="justify-content-center w-100">
        {book.rate ? book.rate : "0"}/5
      </Row>
    </Row>
  );
};

export default Rate;

import styles from "../../../styles/chaptercard.module.css";
import { Container, Col, Row, Fade, Button } from "react-bootstrap";
import { Context } from "../../../Context/Context";
import { deleteOne } from "../../../Services/Books";
import { useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";

const ManageBook = () => {
  const books = useContext(Context).state.books;
  const handleClick = async (id) => {
    const res = await deleteOne(id);
    console.log("DELETE BOOK: " + id);
    Router.reload();
  }

  return (
    <Container className={styles.noPadding + " my-2"}>
      { }

      {books && books.length > 0 ? (
        books.map((item, key1) => (
          <Row key={key1} style={{ margin: 0, position: "relative" }}>
            <Col xs={11}>
              <div>
                {item.name}
              </div>
            </Col>
            <Col xs={1}>
              <Button
                onClick={() => {
                  handleClick(item.id)
                }}>
                Delete
              </Button>
            </Col>
          </Row>
        ))
      ) : (<div>
        Loading
      </div>
      )}
    </Container>
  );
};

export default ManageBook;

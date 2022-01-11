import styles from "../../../styles/chaptercard.module.css";
import { Container, Col, Row, Fade, Button } from "react-bootstrap";
import { Context } from "../../../Context/Context";
import { deleteOne } from "../../../Services/SubCategories";
import { useEffect, useContext } from "react";
import Link from "next/link";

const ManageCategory = () => {
  const categories = useContext(Context).state.cats;
  const handleClick = async (id) => {
    const res = await deleteOne(id);
    Router.reload();
  }

  return (
    <Container className={styles.noPadding + " my-2"}>
      { }

      {categories && categories.length > 0 ? (
        categories.map((item, key1) => (
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
                Xóa
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

export default ManageCategory;

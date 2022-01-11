import styles from "../../../styles/chaptercard.module.css";
import { Container, Col, Row, Fade, Button } from "react-bootstrap";
import { Context } from "../../../Context/User";
import { BlockUser, UnBlockUser, PromoteToAdmin, PromoteToManager } from "../../../Services/Users";
import { useEffect, useContext } from "react";
import Link from "next/link";

const ManageUser = () => {
  const users = useContext(Context).state.users;
  const handleClickBlock = async (data) => {
    const res = await BlockUser(data);
    Router.reload();
  }
  const handleClickUnBlock = async (data) => {
    const res = await UnBlockUser(data);
    Router.reload();
  }
  const handleClickPromoteAdmin = async (data) => {
    const res = await PromoteToAdmin(data);
    Router.reload();
  }
  const handleClickPromoteManager = async (data) => {
    const res = await PromoteToManager(data);
    Router.reload();
  }

  return (
    <Container className={styles.noPadding + " my-2"}>
      { }

      {users && users.length > 0 ? (
        users.map((item, key1) => (
          <Row key={key1} style={{ margin: 0, position: "relative" }}>
            <Col xs={9}>
              <div>
                {item.fullname}
              </div>
            </Col>
            <Col xs={1}>
              {item.blocked !== 1 ? (
                <Button
                  onClick={() => {
                    handleClickBlock(item)
                  }}>
                  Chặn
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleClickUnBlock(item)
                  }}>
                  Bỏ chặn
                </Button>
              )}
            </Col>
            <Col xs={2}>
              {item.userRole == 1 ? (
                <Button
                  onClick={() => {
                    handleClickPromoteAdmin(item)
                  }}>
                  Đặt làm quản lý
                </Button>
              ) : item.userRole == 0 ? (
                <Button
                  onClick={() => {
                    handleClickPromoteManager(item)
                  }}>
                  Đặt làm quản lý
                </Button>
              ) : undefined}
            </Col>
          </Row>
        ))
      ) : (<div>
        Loading...
      </div>
      )}
    </Container>
  );
};

export default ManageUser;

import styles from "../../../styles/mainPage.module.css";
import { Container, Col, Row } from "react-bootstrap";
const Discuss = () => {
  const data = [
    { data: "Hỏi Truyện từ A>Z. Góc 8 nhảm cho dịch giả 2.0", time: "19 phút" },
    { data: "Chuyện gì nếu VN bị xuyên không?", time: "23 phút" },
    { data: "Đề xuất LN/WN cho các trans", time: "40 phút" },
    {
      data: "Tâm thư gửi đến những người đã và đang có ý định dùng máy dịch",
      time: "43 phút",
    },
    { data: "Phòng hỗ trợ dịch thuật", time: "56 phút" },
    { data: "BOX xử lý truyện dịch", time: "1 giờ" },
    { data: "Thảo luận cho tác giả OLN", time: "1 giờ" },
    { data: "Tất Tần Tật Về Hội Thoại", time: "1 giờ" },
    { data: "Hướng dẫn: Viết truyện theo kiểu công nghiệp", time: "2 giờ" },
  ];
  return (
    <Container fluid className={styles.discuss}>
      {data.map((item, key) => (
        <Row key={key}>
          <Col className={styles.discussItem}>{item.data}</Col>
          <Col lg="auto">{item.time}</Col>
        </Row>
      ))}
    </Container>
  );
};
export default Discuss;

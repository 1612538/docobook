import { Container, Row } from "react-bootstrap";

const Loading = () => {
  return (
    <Container fluid>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status"></div>
      </Row>
    </Container>
  );
};
export default Loading;

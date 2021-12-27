import { useEffect, useState, useContext } from "react";
import styles from "../../styles/searchheader.module.css";
import { Container, Row, Fade } from "react-bootstrap";
import SearchCard from "./BookCards/SearchCard";
import { getAllByKeyword as getBooks } from "../../Services/Books";

const SearchHeader = ({ keyword }) => {
  const [books, setBooks] = useState(null);
  const [tmp, setTmp] = useState([]);
  const [root, setRoot] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBooks(keyword.slice(0, 3));
      setTmp([...res]);
      setBooks([
        ...res.filter(
          (ele) =>
            ele.name.toLowerCase().includes(keyword.toLowerCase()) === true
        ),
      ]);
    };
    if (keyword.length >= 3) {
      if (keyword.slice(0, 3) !== root) {
        setBooks(null);
        setTmp([]);
        fetchData();
        setRoot(keyword.slice(0, 3));
      }
      if (keyword.slice(0, 3) === root) {
        setBooks(
          tmp.length > 0
            ? [
                ...tmp.filter(
                  (ele) =>
                    ele.name.toLowerCase().includes(keyword.toLowerCase()) ===
                    true
                ),
              ]
            : null
        );
      }
    } else {
      setBooks(null);
    }
  }, [keyword]);
  return (
    <Fade in={keyword.length > 0 ? true : false}>
      <Container fluid className={styles.mycontainer}>
        {books ? (
          books.length > 0 ? (
            books.map((item, key) => (
              <Row key={key} className="m-0">
                <SearchCard Book={item}></SearchCard>
              </Row>
            ))
          ) : (
            <Row
              className="m-0 justify-content-center align-items-center"
              style={{ height: 100 }}
            >
              <div className="text-center">
                <b>Không tìm thấy</b>
              </div>
            </Row>
          )
        ) : (
          <Row
            className="m-0 justify-content-center align-items-center"
            style={{ height: 100 }}
          >
            <div className="spinner-border" role="status"></div>
          </Row>
        )}
      </Container>
    </Fade>
  );
};

export default SearchHeader;

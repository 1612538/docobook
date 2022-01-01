import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../styles/BookChapter/tool.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowLeft,
  faArrowRight,
  faFont,
  faList,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { AddSaved, getOne, deleteOne } from "../../../Services/Saved";
import { useState, useEffect } from "react";

const Tool = ({ chapter, chapters, setShow, show, setModalShow }) => {
  const [isSaved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkData = async () => {
      setLoading(true);
      const id = JSON.parse(localStorage.getItem("user")).id;
      const res = await getOne(id, chapter.id);
      if (res) setSaved(res.id);
      else setSaved(false);
      setLoading(false);
    };
    if (localStorage.getItem("user") && chapter) {
      checkData();
    }
  }, [chapter]);

  const handleClick = async () => {
    if (localStorage.getItem("user")) {
      setLoading(true);
      if (isSaved) {
        const res = await deleteOne(isSaved);
        setSaved(false);
      } else {
        const data = {
          bookchapter: chapter,
          user: JSON.parse(localStorage.getItem("user")),
        };
        const res = await AddSaved(data);
        setSaved(res.id);
      }
      setLoading(false);
    } else alert("Bạn phải đăng nhập để sử dụng tính năng này");
  };

  return (
    <Container fluid className={styles.mainBox}>
      {chapters &&
      chapters.length > 0 &&
      chapter.chapternumber !== chapters[0].chapternumber ? (
        <div className={styles.iconFormat}>
          <Link
            href={
              "/BookInfos/" +
              chapter.bookinfo.id.toString() +
              "/" +
              (chapter.chapternumber - 1).toString()
            }
          >
            <div className={styles.iconSize}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.iconFormat + " " + styles.disabled}>
          <div className={styles.iconSize}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </div>
      )}
      <div className={styles.iconFormat}>
        <Link href="/">
          <div className={styles.iconSize}>
            <FontAwesomeIcon icon={faHome} />
          </div>
        </Link>
      </div>
      {chapters &&
      chapters.length > 0 &&
      chapter.chapternumber !== chapters[chapters.length - 1].chapternumber ? (
        <div className={styles.iconFormat}>
          <Link
            href={
              "/BookInfos/" +
              chapter.bookinfo.id.toString() +
              "/" +
              (chapter.chapternumber + 1).toString()
            }
          >
            <div className={styles.iconSize}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.iconFormat + " " + styles.disabled}>
          <div className={styles.iconSize}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      )}
      <div className={styles.iconFormat}>
        <div className={styles.iconSize} onClick={() => setModalShow(true)}>
          <FontAwesomeIcon icon={faFont} />
        </div>
      </div>
      <div className={styles.iconFormat}>
        {loading ? (
          <div
            className="spinner-border"
            role="status"
            style={{ marginLeft: "0.5rem" }}
          ></div>
        ) : (
          <div className={styles.iconSize} onClick={handleClick}>
            <FontAwesomeIcon
              icon={faBookmark}
              style={isSaved ? { color: "#228B22" } : {}}
            />
          </div>
        )}
      </div>
      <div
        className={styles.iconFormat}
        onClick={() => {
          setShow(!show);
        }}
        style={{ border: 0 }}
      >
        <div className={styles.iconSize}>
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
    </Container>
  );
};
export default Tool;

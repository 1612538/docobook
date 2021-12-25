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
} from "@fortawesome/free-solid-svg-icons";

const Tool = ({ chapter, previous, next }) => {
  return (
    <Container fluid className={styles.mainBox}>
      {previous === 0 ? (
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
      {next === 0 ? (
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
        <div className={styles.iconSize}>
          <FontAwesomeIcon icon={faFont} />
        </div>
      </div>
      <div className={styles.iconFormat} style={{ border: 0 }}>
        <div className={styles.iconSize}>
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
    </Container>
  );
};
export default Tool;

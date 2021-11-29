import { useState } from "react";
import styles from "../../styles/header.module.css";

export default function Header() {
  const [list, setList] = useState([
    "Trang chủ",
    "Thể loại",
    "Giới thiệu",
    "Thông tin liên hệ",
  ]);
  return (
    <div className={styles.background}>
      {list.map((item, key) => (
        <a
          className={
            key === 0
              ? `${styles.navItem} ${styles.navItemActive} `
              : styles.navItem
          }
          key={key}
          href="#"
        >
          {item}
        </a>
      ))}
    </div>
  );
}

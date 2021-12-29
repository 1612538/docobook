import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainPage from "./Components/BookChapter/MainPage";
import { useEffect, useContext } from "react";
import { Context } from "../Context/BookInfosContext";
import { getByBook } from "../Services/BookChapters";

export default function Home({ chapter }) {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const chapters = await getByBook(chapter.bookinfo.id.toString());
      context.handle.handleChapters(chapters);
    };
    context.handle.handleChapter(chapter);
    fetchData();
    return () => context.handle.handleChapters(null);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainPage></MainPage>
      </main>
    </div>
  );
}

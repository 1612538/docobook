import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "./Components/Header";
import MainPage from "./Components/BookInfos/MainPage";
import Footer from "./Components/Footer";
import { Context as Cont } from "../Context/BookInfosContext";
import { Context } from "../Context/Context";
import { ParseGetAll } from "../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../Services/Countries";
import { useEffect, useContext } from "react";
import { getByBook } from "../Services/BookChapters";

export default function Home({ BookInfo }) {
  const context = useContext(Cont);
  const context2 = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Chapters = await getByBook(BookInfo.id);
      context.handle.handleChapters(Chapters);
      if (
        context2.state.categories === null ||
        context2.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context2.handle.handleCategories(categories);
      }
      if (
        context2.state.countries === null ||
        context2.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context2.handle.handleCountries(countries);
      }
    };
    context.handle.handleBook(BookInfo);
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar></NavBar>
        <MainPage></MainPage>
      </main>
      <Footer></Footer>
    </div>
  );
}

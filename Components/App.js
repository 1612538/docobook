import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "./Components/Header";
import MainPage from "./Components/MainPage";
import Footer from "./Components/Footer";

export default function Home() {
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

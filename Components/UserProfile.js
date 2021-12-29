import Head from "next/head";
import styles from "../styles/Home.module.css";
import NavBar from "./Components/Header";
import MainPage from "./Components/UserProfile/MainPage";
import Footer from "./Components/Footer";
import { Context } from "../Context/Context";
import { Context as UserContext } from "../Context/User";
import { ParseGetAll } from "../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../Services/Countries";
import { getAllByUploader } from "../Services/Books";
import { useEffect, useContext } from "react";

export default function Home({ user, type }) {
  const context = useContext(Context);
  const userContext = useContext(UserContext);
  useEffect(() => {
    const fetchData = async (user) => {
      let mainUser = user;
      if (type === "default")
        if (localStorage.getItem("user")) {
          mainUser = JSON.parse(localStorage.getItem("user"));
        } else {
          router.push("/error");
          return;
        }
      userContext.handle.handleUser(mainUser);
      context.handle.handleBooks(await getAllByUploader(mainUser.id));
      if (
        context.state.categories === null ||
        context.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context.handle.handleCategories(categories);
      }
      if (
        context.state.countries === null ||
        context.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context.handle.handleCountries(countries);
      }
    };
    fetchData(user);
    return () => {
      context.handle.handleBooks(null);
    };
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

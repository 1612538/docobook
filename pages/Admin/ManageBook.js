import Head from "next/head";
import Header from "../../Components/components/Header";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import NavBar from "../../Components/components/Admin/NavBar";
import ManageBook from "../../Components/components/Admin/ManageBook";
import { Context } from "../../Context/Context";
import { ParseGetAll, getOne } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAll } from "../../Services/Books";

const AdminManageBook = () => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      if (
        context.state.countries === null ||
        context.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context.handle.handleCountries(countries);
      }
      if (
        context.state.categories === null ||
        context.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context.handle.handleCategories(categories);
      }
      if (
        context.state.books === null ||
        context.state.books.length === 0
      ) {
        const books = await getAll();
        context.handle.handleBooks(books);
      }
    };
    fetchData();
    return () => {
      context.handle.handleBooks(null);
    };
  }, []);
  return (
    <div>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header></Header>
        <NavBar></NavBar>
        <ManageBook></ManageBook>
      </main>
    </div>
  );
};

export default AdminManageBook;

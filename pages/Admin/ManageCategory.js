import Head from "next/head";
import Header from "../../Components/components/Header";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import NavBar from "../../Components/components/Admin/NavBar";
import ManageCategory from "../../Components/components/Admin/ManageCategory";
import { Context } from "../../Context/Context";
import { ParseGetAll, getAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";

const AdminManageCategory = (user) => {
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
        context.state.cats === null ||
        context.state.cats.length === 0
      ) {
        const cats = await getAll();
        context.handle.handleCats(cats);
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
        <ManageCategory></ManageCategory>
      </main>
    </div>
  );
};

export default AdminManageCategory;
